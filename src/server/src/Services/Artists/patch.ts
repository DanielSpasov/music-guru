import { NextFunction, Request, Response } from 'express';

import { ArtistSchema } from '../../Validations';
import { connect } from '../../Database';
import { APIError } from '../../Error';

export default async (req: Request, res: Response, next: NextFunction) => {
  const mongo = await connect();
  try {
    const collection = mongo.db('models').collection('artists');
    const doc = collection.aggregate([{ $match: { uid: req.params.id } }]);
    const [item] = await doc.toArray();
    if (item.created_by !== res.locals.user.uid) {
      throw new APIError(403, 'Permission denied.');
    }

    const updated = await collection.findOneAndUpdate(
      { uid: req.params.id },
      {
        $set: {
          ...item,
          ...ArtistSchema.parse({
            ...req.body,
            favorites: item.favorites
          })
        }
      },
      { upsert: true, returnDocument: 'after' }
    );

    res.status(200).json({
      message: 'Success',
      data: { uid: req.params.id, name: updated?.name }
    });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
