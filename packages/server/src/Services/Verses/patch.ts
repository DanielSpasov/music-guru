import { NextFunction, Request, Response } from 'express';

import { VerseSchema } from '../../Validations/Song';
import Song from '../../Schemas/Song';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verse = VerseSchema.parse({
      ...req.body.verse,
      number: Number(req.params.number)
    });

    await Song.updateOne(
      { uid: req.params.id, 'verses.number': Number(req.params.number) },
      { $set: { 'verses.$': verse } }
    );

    res
      .status(200)
      .json({ data: verse, message: 'Verse updated successfully.' });
  } catch (err) {
    next(err);
  }
};
