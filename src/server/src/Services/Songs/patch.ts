import { Request, Response } from 'express';

import { PatchSongSchema } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';

export default async function patch(req: Request, res: Response) {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection = db.collection('songs');

    await collection.updateOne(
      { uid: req.params.id },
      { $set: PatchSongSchema.parse(req.body) }
    );

    res.status(200).json();
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    await mongo.close();
  }
}
