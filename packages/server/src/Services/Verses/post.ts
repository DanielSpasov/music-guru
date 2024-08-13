import { NextFunction, Request, Response } from 'express';

import { VerseSchema } from '../../Validations/Song';
import Song from '../../Schemas/Song';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verse = VerseSchema.parse({
      ...req.body,
      number: res.locals.item.verses.length + 1
    });

    await Song.updateOne({ uid: req.params.id }, { $push: { verses: verse } });

    res.status(200).send({ data: verse, message: 'Verse added successfully.' });
  } catch (err) {
    next(err);
  }
};
