import { Request, Response } from 'express';

import { ArtistModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import { transformArtist } from '../../Transforms';

export async function fetch(req: Request, res: Response) {
  try {
    const artists = await ArtistModel.find(
      req.query.search
        ? { name: { $regex: req.query.search, $options: 'i' } }
        : {}
    )
      .limit(25)
      .transform(x => x.map(transformArtist));
    res.status(200).json({ data: artists });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
