import { NextFunction, Request, Response } from 'express';

import { serialize } from '../../Utils';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ data: serialize({ req, res }) });
  } catch (err) {
    next(err);
  }
};
