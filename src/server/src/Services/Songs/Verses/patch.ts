import { Request, Response } from 'express';
import { Collection } from 'mongodb';

import { VerseSchema } from '../../../Database/Schemas/Song';
import { Song } from '../../../Database/Types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';

export default async function (req: Request, res: Response) {
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
    errorHandler(req, res, err);
  } finally {
    await mongo.close();
  }
}
