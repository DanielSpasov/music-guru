import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { ExtendedRequest } from '../../Database';
import { Models } from '../../Database/Types';
import { errorHandler } from '../../Error';
import env from '../../env';

export default function favorite({ model }: { model: Models }) {
  return async function (request: Request, res: Response) {
    const req = request as ExtendedRequest;
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
      }

      if (!req?.body?.uid) {
        res.status(400).json({ message: 'Please provide object UID.' });
        return;
      }

      const { uid: userUID } = jwt.verify(
        token,
        env.SECURITY.JWT_SECRET
      ) as JwtPayload;

      const db = req.mongo.db('models');

      const usersCollection = db.collection('users');
      const modelCollection = db.collection(model);

      const usersDocs = usersCollection.aggregate([
        { $match: { uid: userUID } }
      ]);
      const [user] = await usersDocs.toArray();

      const isFavorite = user?.favorites?.[model]?.includes(req.body.uid);

      const [, updatedUser] = await Promise.all([
        modelCollection.updateOne(
          { uid: req.body.uid },
          { $inc: { favorites: isFavorite ? -1 : 1 } }
        ),
        usersCollection.findOneAndUpdate(
          { uid: userUID },
          isFavorite
            ? { $pull: { [`favorites.${model}`]: req.body.uid } }
            : { $addToSet: { [`favorites.${model}`]: req.body.uid } },
          { returnDocument: 'after' }
        )
      ]);

      res.status(200).json({ favorites: updatedUser?.favorites });
    } catch (err) {
      errorHandler(req, res, err);
    }
  };
}
