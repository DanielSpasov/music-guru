import { Request, Response } from 'express';

import { artistSchema } from '../../Validations/Artist';
import { CustomError } from '../../Error/CustomError';
import { ArtistModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';

export async function patch(req: Request, res: Response) {
  try {
    const validData = artistSchema.parse(req.body);
    const updatedArtist = await ArtistModel.findOneAndUpdate(
      { uid: req.params.id },
      validData,
      { new: true }
    );

    if (!updatedArtist) {
      throw new CustomError({ message: 'Artist not Found.', code: 404 });
    }

    res.status(200).json({ data: updatedArtist });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
