import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import Album from '../../../Schemas/Album';
import { Disc } from '../../../Types';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discNumber = z.number().parse(Number(req.params.number));

    const updatedDiscs = res.locals.item.discs
      .filter((disc: Disc) => disc.number !== discNumber)
      .map((disc: Disc) => {
        if (disc.number < discNumber) return disc;
        return { ...disc, number: disc.number - 1 };
      });

    await Album.updateOne(
      { uid: req.params.id },
      { $set: { discs: updatedDiscs } }
    );

    res.status(200).json({ message: 'Disc deleted.' });
  } catch (err) {
    next(err);
  }
};
