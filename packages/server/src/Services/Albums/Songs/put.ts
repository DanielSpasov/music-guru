import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import Album from '../../../Schemas/Album';
import { schemas } from '../../../Schemas';
import { APIError } from '../../../Error';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const songs = z
      .array(z.object({ number: z.number(), uid: z.string().uuid() }))
      .parse(req.body.songs);
    const discNumber = z.number().parse(req.body.disc);

    const songsUids = songs.map(x => x.uid);

    const foundSongs = await schemas.songs
      .find({ uid: { $in: songsUids } }, { uid: 1 })
      .lean()
      .distinct('uid');

    const nonExistingUIDs = songsUids.filter(uid => !foundSongs.includes(uid));
    if (nonExistingUIDs.length > 0) {
      throw new APIError(
        404,
        `Songs not found: ${nonExistingUIDs.join(', ')}.`
      );
    }

    await Album.updateOne(
      { uid: req.params.id },
      { $set: { [`discs.${discNumber - 1}.songs`]: songs } }
    );

    res.status(200).json({ message: 'Editors removed.' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
