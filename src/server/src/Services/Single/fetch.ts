import { Request, Response } from 'express';

import { getMongoSearchQuery } from '../../Utils/getSearchQuery';
import { SingleModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';

export async function fetch(req: Request, res: Response) {
  try {
    const search = getMongoSearchQuery(req.query.search);
    if (!search) {
      res.status(200).json({ data: [] });
      return;
    }

    const singles = await SingleModel.find(search).limit(25).populate('artist');

    res.status(200).json({ data: singles });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
