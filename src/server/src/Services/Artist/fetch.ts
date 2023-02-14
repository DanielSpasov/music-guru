import { Request, Response } from 'express';

import { getMongoSearchQuery } from '../../Utils/getSearchQuery';
import { ArtistModel } from '../../Database/Schemas';
import { transformArtist } from '../../Transforms';
import { errorHandler } from '../../Error';

export async function fetch(req: Request, res: Response) {
  try {
    const search = getMongoSearchQuery(req.query.search);
    if (!search) {
      res.status(200).json({ data: [] });
      return;
    }

    const artists = await ArtistModel.find(search)
      .limit(25)
      .transform(x => x.map(transformArtist));

    res.status(200).json({ data: artists });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
