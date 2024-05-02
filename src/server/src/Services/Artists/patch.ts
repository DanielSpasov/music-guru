import { Request, Response } from 'express';

import { ArtistSchema } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';

export default async function patch(req: Request, res: Response) {
  const mongo = await connect();
  try {
    const collection = mongo.db('models').collection('artists');
    const doc = collection.aggregate([{ $match: { uid: req.params.id } }]);
    const [item] = await doc.toArray();
    if (item.created_by !== res.locals.userUID) {
      res.status(403).json({ message: 'Permission denied.' });
      return;
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
  } catch (error) {
    errorHandler(req, res, error);
  } finally {
    mongo.close();
  }
}
