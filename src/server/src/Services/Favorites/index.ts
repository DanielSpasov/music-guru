import { NextFunction, Request, Response } from 'express';

import { Models } from '../../Database/Types';
import { connect } from '../../Database';
import { APIError } from '../../Error';

export default ({ model }: { model: Models }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const mongo = await connect();
    try {
      if (!req?.body?.uid) {
        throw new APIError(400, 'Please provide object UID.');
      }

      const db = mongo.db('models');

      const usersCollection = db.collection('users');
      const modelCollection = db.collection(model);

      const usersDocs = usersCollection.aggregate([
        { $match: { uid: res.locals.user.uid } }
      ]);
      const [user] = await usersDocs.toArray();

      const isFavorite = user?.favorites?.[model]?.includes(req.body.uid);

      const [, updatedUser] = await Promise.all([
        modelCollection.updateOne(
          { uid: req.body.uid },
          { $inc: { favorites: isFavorite ? -1 : 1 } }
        ),
        usersCollection.findOneAndUpdate(
          { uid: res.locals.user.uid },
          isFavorite
            ? { $pull: { [`favorites.${model}`]: req.body.uid } }
            : { $addToSet: { [`favorites.${model}`]: req.body.uid } },
          { returnDocument: 'after' }
        )
      ]);

      res.status(200).json({ favorites: updatedUser?.favorites });
    } catch (err) {
      next(err);
    } finally {
      await mongo.close();
    }
  };
