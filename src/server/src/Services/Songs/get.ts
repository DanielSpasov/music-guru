import { Request, Response } from 'express';

import { errorHandler } from '../../Error';
import { serialize } from '../../Utils';

export default async function get(req: Request, res: Response) {
  try {
    res.status(200).json({ data: serialize({ req, res }) });
  } catch (err) {
    errorHandler(req, res, err);
  }
}
