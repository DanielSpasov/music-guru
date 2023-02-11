import { Request, Response } from 'express';

import { CustomError } from '../../Error/CustomError';
import { ArtistModel } from '../../Database/Schemas';
import { transformArtist } from '../../Transforms';
import { errorHandler } from '../../Error';

export async function get(req: Request, res: Response) {
  try {
    const artist = await ArtistModel.findOne({ uid: req.params.id });
    if (!artist) {
      throw new CustomError({ message: 'Artist not Found.', code: 404 });
    }

    res.status(200).json({ data: artist.toJSON() });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
