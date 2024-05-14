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
    const doc = await collection.findOne({ uid: req.params.id });

    if (!doc) {
      res.status(404).json({ message: 'Song Not found.' });
      return;
    }

    if (doc.created_by !== res.locals.user.uid) {
      res.status(403).json({ message: 'Permission denied.' });
      return;
    }

    const verse = VerseSchema.parse({
      ...req.body,
      number: doc.verses.length + 1
    });

    await collection.updateOne(
      { uid: req.params.id },
      { $push: { verses: verse } }
    );

    res.status(200).send({ data: verse, message: 'Verse added successfully.' });
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    mongo.close();
  }
}
