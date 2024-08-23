import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { AlbumSongsSchema } from '../../../Validations/Album';
import { Album as IAlbum, Disc } from '../../../Types';
import { schemas } from '../../../Schemas';
import Album from '../../../Schemas/Album';
import { APIError } from '../../../Error';

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

    const album = res.locals.item as IAlbum;
    const discsSongsArr = album.discs
      .map(disc => [...disc.songs.map(song => song.uid)])
      .flat();
    const alreadyAdded = songsUids.filter(uid => discsSongsArr.includes(uid));
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
              number: discNumber,
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
    next(err);
  }
};
