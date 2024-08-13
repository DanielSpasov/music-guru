import { NextFunction, Request, Response } from 'express';

import { APIError } from '../Error';

const ownership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.locals?.item?.created_by !== res.locals.user.uid) {
      throw new APIError(
        403,
        'Permission denied. Only the creator of this item can access this resource.'
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default ownership;
