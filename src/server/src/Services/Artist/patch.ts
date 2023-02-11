import { Request, Response } from 'express';

import { ArtistModel } from '../../Database/Schemas';
import { artistSchema } from '../../Validations/Artist';
import { errorHandler } from '../../Error';

export async function patch(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validData = artistSchema.parse(req.body);
    const updatedArtist = await ArtistModel.findOneAndUpdate(
      { uid: id },
      validData,
      { new: true }
    );

    res.status(200).json({ data: updatedArtist });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
