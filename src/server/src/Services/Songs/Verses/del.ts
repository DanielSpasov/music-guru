import { Request, Response } from 'express';

import { DBSong } from '../../../Database/Types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';
import { Verse } from '../../../Database/Types/Song';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection = db.collection<DBSong>('songs');

    if (!req.params.number) {
      res.status(400).json({ message: 'Verse number is required.' });
      return;
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
    errorHandler(req, res, err);
  } finally {
    mongo.close();
  }
}
