import { Request, Response } from 'express';
import { Collection } from 'mongodb';

import { SongSchema } from '../../Database/Schemas';
import { DBSong } from '../../Database/Types';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';

export default async function patch(req: Request, res: Response) {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection: Collection<DBSong> = db.collection('songs');
    const song = await collection.findOne({ uid: req.params.id });

    if (!song) {
      res.status(404).json({ message: 'Song Not found.' });
      return;
    }

    if (song.created_by !== res.locals.userUID) {
      res.status(403).json({ message: 'Permission denied.' });
      return;
    }

    const validatedData = SongSchema.parse(req.body);

    await collection.findOneAndUpdate(
      { uid: req.params.id },
      {
        $set: {
          ...validatedData,
          image: song.image,
          verses: song.verses
        }
      },
      { upsert: true }
    );

    res.status(200).json({
      message: 'Song updated successfully',
      data: { uid: req.params.id, name: validatedData.name }
    });
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    mongo.close();
  }
}
