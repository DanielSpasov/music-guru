import { Request, Response } from 'express';
import { Collection } from 'mongodb';

import { Song } from '../../../Database/Types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';
import { VerseSchema } from '../../../Database/Schemas/Song';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection: Collection<Song> = db.collection('songs');
    const doc = await collection.findOne({ uid: req.params.id });

    if (!doc) {
      res.status(404).json({ message: 'Song Not found.' });
      return;
    }

    if (doc.created_by !== res.locals.userUID) {
      res.status(403).json({ message: 'Permission denied.' });
      return;
    }

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
    mongo.close();
  }
}
