import { Request, Response } from 'express';

import { getMongoSearchQuery } from '../../Utils/getSearchQuery';
import { ArtistModel, SingleModel } from '../../Database/Schemas';
import { transformSingle } from '../../Transforms';
import { errorHandler } from '../../Error';

export async function fetch(req: Request, res: Response) {
  try {
    const search = getMongoSearchQuery(req.query.search);
    if (!search) {
      res.status(200).json({ data: [] });
      return;
    }

    const singles = await SingleModel.find(search)
      .limit(25)
      .populate('artist')
      .transform(x => x.map(transformSingle));

    res.status(200).json({ data: singles });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
