import { NextFunction, Request, Response } from 'express';

import { APIError } from '../../Error';
import Song from '../../Schemas/Song';
import { Verse } from '../../Types';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.number) {
      throw new APIError(400, 'Verse number is required.');
    }

    const updatedVerses = res.locals.item.verses
      .filter((verse: Verse) => verse.number !== Number(req.params.number))
      .map((verse: Verse) => {
        if (verse.number < Number(req.params.number)) return verse;
        return { ...verse, number: verse.number - 1 };
      });

    await Song.updateOne(
      { uid: req.params.id },
      { $set: { verses: updatedVerses } }
    );

    res
      .status(200)
      .json({ data: updatedVerses, message: 'Verse deleted succesfully.' });
  } catch (err) {
    next(err);
  }
};
