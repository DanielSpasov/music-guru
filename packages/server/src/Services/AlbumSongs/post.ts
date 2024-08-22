import { NextFunction, Request, Response } from 'express';

import { AlbumSongsSchema } from '../../Validations/Album';
import { schemas } from '../../Schemas';
import { APIError } from '../../Error';
import { Disc } from '../../Types';
import { z } from 'zod';
import Album from '../../Schemas/Album';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const songsUids = AlbumSongsSchema.parse(req.body.songs);
    const discNumber = z.number().parse(req.body.disc);

    const songs = await schemas.songs
      .find({ uid: { $in: songsUids } }, { uid: 1 })
      .lean()
      .distinct('uid');

    const nonExistingUIDs = songsUids.filter(uid => !songs.includes(uid));
    if (nonExistingUIDs.length > 0) {
      throw new APIError(
        404,
        `Songs not found: ${nonExistingUIDs.join(', ')}.`
      );
    }

    const album = res.locals.item;
    const alreadyAdded = songsUids.filter(uid =>
      album.discs.flat().includes(uid)
    );
    if (alreadyAdded.length > 0) {
      throw new APIError(
        400,
        `Songs are already in this album: ${alreadyAdded.join(', ')}.`
      );
    }

    const disc = album.discs.find((disc: Disc) => disc.number === discNumber);
    if (!disc) {
      await Album.updateOne(
        { uid: req.params.id },
        {
          $push: {
            discs: {
              number: album.discs.length,
              songs: songsUids.map((uid, i) => ({
                uid,
                number: i
              }))
            }
          }
        }
      );
    } else {
      await Album.updateOne(
        { uid: req.params.id },
        {
          $push: {
            [`discs.${discNumber}.songs`]: {
              $each: songsUids.map((uid, i) => ({
                uid,
                number: disc.songs.length + i
              }))
            }
          }
        }
      );
    }

    res.status(200).json({ message: 'Songs added.' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
