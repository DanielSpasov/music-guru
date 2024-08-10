import { NextFunction, Request, Response } from 'express';

import { APIError } from '../Error';

export default async function ownership(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (res.locals?.item?.created_by?.uid !== res.locals.user.uid) {
      throw new APIError(
        403,
        'Permission denied. Only the creator of this item can access this resource.'
      );
    }

    next();
  } catch (err) {
    next(err);
  }
}
