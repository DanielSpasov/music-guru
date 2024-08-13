import { NextFunction, Request, Response } from 'express';

import { schemas } from '../../Schemas';
import { APIError } from '../../Error';
import User from '../../Schemas/User';
import { Model } from '../../Types';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req?.body?.uid) {
        throw new APIError(400, 'Please provide object UID.');
      }

      const [user] = await User.aggregate().match({ uid: res.locals.user.uid });

      const isFavorite = user?.favorites?.[model]?.includes(req.body.uid);

      const [, updatedUser] = await Promise.all([
        schemas[model].updateOne(
          { uid: req.body.uid },
          { $inc: { favorites: isFavorite ? -1 : 1 } }
        ),
        User.findOneAndUpdate(
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
    }
  };
