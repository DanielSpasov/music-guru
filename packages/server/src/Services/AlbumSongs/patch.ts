import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { AlbumSongsSchema } from '../../Validations/Album';
import { Album as IAlbum, Disc } from '../../Types';
import Album from '../../Schemas/Album';
import { schemas } from '../../Schemas';
import { APIError } from '../../Error';

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
    const notInAlbum = songsUids.filter(uid => !discsSongsArr.includes(uid));
    if (notInAlbum.length > 0) {
      throw new APIError(
        400,
        `Songs are not in this album: ${notInAlbum.join(', ')}.`
      );
    }

    const disc = album.discs.find((disc: Disc) => disc.number === discNumber);
    const updatedSongs = disc?.songs
      .filter(song => !songsUids.includes(song.uid))
      .map((song, i) => ({ ...song, number: i }));

    await Album.updateOne(
      { uid: req.params.id },
      { $set: { [`discs.${discNumber}.songs`]: updatedSongs } }
    );

    res.status(200).json({ message: 'Editors removed.' });
  } catch (err) {
    next(err);
  }
};
