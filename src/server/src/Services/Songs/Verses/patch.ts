import { NextFunction, Request, Response } from 'express';
import { Collection } from 'mongodb';

import { VerseSchema } from '../../../Validations/Song';
import { connect } from '../../../Database';
import { Song } from '../../../Types';

export default async (req: Request, res: Response, next: NextFunction) => {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection: Collection<Song> = db.collection('songs');

    const verse = VerseSchema.parse({
      ...req.body.verse,
      number: Number(req.params.number)
    });

    await collection.updateOne(
      { uid: req.params.id, 'verses.number': Number(req.params.number) },
      { $set: { 'verses.$': verse } }
    );

    res
      .status(200)
      .json({ data: verse, message: 'Verse updated successfully.' });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
