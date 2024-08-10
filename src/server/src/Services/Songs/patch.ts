import { NextFunction, Request, Response } from 'express';

import { PatchSongSchema } from '../../Database/Schemas';
import { connect } from '../../Database';

export default async (req: Request, res: Response, next: NextFunction) => {
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
    next(err);
  } finally {
    await mongo.close();
  }
};
