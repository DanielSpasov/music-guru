import { Request, Response } from 'express';
import { Collection } from 'mongodb';

import { Song } from '../../../Database/Types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection: Collection<Song> = db.collection('songs');
    const song = await collection.findOne({ uid: req.params.id });

    if (!song) {
      res.status(404).json({ message: 'Song Not found.' });
      return;
    }

    if (song.created_by !== res.locals.user.uid) {
      res.status(403).json({ message: 'Permission denied.' });
      return;
    }

    if (!req.params.number) {
      res.status(400).json({ message: 'Verse number is required.' });
      return;
    }

    const updatedVerses = song.verses
      .filter(verse => verse.number !== Number(req.params.number))
      .map(verse => {
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
