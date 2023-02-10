import { raw, Request, Response } from 'express';

import { ArtistModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import { transformArtist } from '../../Transforms';

export async function get(req: Request, res: Response) {
  try {
    const artist = await ArtistModel.findOne({ uid: req.params.id }).transform(
      transformArtist
    );
    res.status(200).json({ data: artist });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
