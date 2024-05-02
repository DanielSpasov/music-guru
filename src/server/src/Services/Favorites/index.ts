import { Request, Response } from 'express';

import { Models } from '../../Database/Types';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';

export default function favorite({ model }: { model: Models }) {
  return async function (req: Request, res: Response) {
    const mongo = await connect();
    try {
      if (!req?.body?.uid) {
        res.status(400).json({ message: 'Please provide object UID.' });
        return;
      }

      const db = mongo.db('models');

      const usersCollection = db.collection('users');
      const modelCollection = db.collection(model);

      const usersDocs = usersCollection.aggregate([
        { $match: { uid: res.locals.userUID } }
      ]);
      const [user] = await usersDocs.toArray();

      const isFavorite = user?.favorites?.[model]?.includes(req.body.uid);

      const [, updatedUser] = await Promise.all([
        modelCollection.updateOne(
          { uid: req.body.uid },
          { $inc: { favorites: isFavorite ? -1 : 1 } }
        ),
        usersCollection.findOneAndUpdate(
          { uid: res.locals.userUID },
          isFavorite
            ? { $pull: { [`favorites.${model}`]: req.body.uid } }
            : { $addToSet: { [`favorites.${model}`]: req.body.uid } },
          { returnDocument: 'after' }
        )
      ]);

      res.status(200).json({ favorites: updatedUser?.favorites });
    } catch (err) {
      errorHandler(req, res, err);
    } finally {
      mongo.close();
    }
  };
}
