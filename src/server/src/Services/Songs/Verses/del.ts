import { NextFunction, Request, Response } from 'express';

import { Verse } from '../../../Database/Types/Song';
import { DBSong } from '../../../Database/Types';
import { connect } from '../../../Database';
import { APIError } from '../../../Error';

export default async (req: Request, res: Response, next: NextFunction) => {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection = db.collection<DBSong>('songs');

    if (!req.params.number) {
      throw new APIError(400, 'Verse number is required.');
    }

    const updatedVerses = res.locals.item.verses
      .filter((verse: Verse) => verse.number !== Number(req.params.number))
      .map((verse: Verse) => {
        if (verse.number < Number(req.params.number)) return verse;
        return { ...verse, number: verse.number - 1 };
      });

    await collection.updateOne(
      { uid: req.params.id },
      { $set: { verses: updatedVerses } }
    );

    res
      .status(200)
      .json({ data: updatedVerses, message: 'Verse deleted succesfully.' });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
