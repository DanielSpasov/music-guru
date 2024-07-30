import { Request, Response } from 'express';

import { VerseSchema } from '../../../Database/Schemas/Song';
import { DBSong } from '../../../Database/Types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection = db.collection<DBSong>('songs');

    const verse = VerseSchema.parse({
      ...req.body,
      number: res.locals.item.verses.length + 1
    });

    await collection.updateOne(
      { uid: req.params.id },
      { $push: { verses: verse } }
    );

    res.status(200).send({ data: verse, message: 'Verse added successfully.' });
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    await mongo.close();
  }
}
