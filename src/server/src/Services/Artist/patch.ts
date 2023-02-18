import { Request, Response } from 'express';

import { Artist, artistSchema } from '../../Types/Artist';
import { CustomError } from '../../Error/CustomError';
import { ArtistModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import getUser from '../../Utils/getUser';

export async function patch(req: Request, res: Response) {
  try {
    const user = await getUser(req.headers?.authorization);

    const artistDoc = await ArtistModel.findOne({ uid: req.params.id });
    const artist = artistDoc as unknown as Artist;
    if (!artist) {
      throw new CustomError({ message: 'Artist not Found.', code: 404 });
    }

    if (artist.created_by.uid !== user.uid) {
      throw new CustomError({ message: 'Permission denied.', code: 401 });
    }

    const validData = artistSchema.parse(req.body);
    const updatedArtist = await ArtistModel.findOneAndUpdate(
      { uid: req.params.id },
      validData,
      { new: true }
    );

    res.status(200).json({ data: updatedArtist });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
