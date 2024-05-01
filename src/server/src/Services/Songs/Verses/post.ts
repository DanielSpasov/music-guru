import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Collection } from 'mongodb';

import { VerseSchema } from '../../../Database/Schemas/Song';
import { Song } from '../../../Database/Types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';
import env from '../../../env';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const token = req.headers?.authorization;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    const { uid: userUID } = jwt.verify(
      token,
      env.SECURITY.JWT_SECRET
    ) as JwtPayload;

    const db = mongo.db('models');
    const collection: Collection<Song> = db.collection('songs');
    const doc = await collection.findOne({ uid: req.params.id });

    if (!doc) {
      res.status(404).json({ message: 'Song Not found.' });
      return;
    }

    if (doc.created_by !== userUID) {
      res.status(401).json({ message: 'Permission denied.' });
      return;
    }

    const validatedVerse = VerseSchema.parse(req.body);

    await collection.updateOne(
      { uid: req.params.id },
      {
        $push: {
          verses: {
            ...validatedVerse,
            number: doc.verses.length + 1
          }
        }
      }
    );

    res
      .status(200)
      .send({ data: validatedVerse, message: 'Verse added successfully.' });
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    mongo.close();
  }
}
