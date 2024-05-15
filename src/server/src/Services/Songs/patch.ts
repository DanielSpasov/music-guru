import { Request, Response } from 'express';

import { SongSchema } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';

export default async function patch(req: Request, res: Response) {
  const mongo = await connect();
  try {
    const validatedData = SongSchema.parse(req.body);

    const db = mongo.db('models');
    const collection = db.collection('songs');

    await collection.updateOne(
      { uid: req.params.id },
      {
        $set: {
          ...validatedData,
          image: res.locals.item.image,
          verses: res.locals.item.verses
        }
      },
      { upsert: true }
    );

    res.status(200).json({ data: {} });
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    mongo.close();
  }
}
