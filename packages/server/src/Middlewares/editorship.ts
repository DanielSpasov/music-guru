import { NextFunction, Request, Response } from 'express';

import { APIError } from '../Error';
import { BaseModel } from '../Types';

const editorship = async <T extends BaseModel>(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = res.locals?.item as T;
    const isOwner = item.created_by === res.locals.user.uid;
    const isEditor = Boolean(
      item.editors?.find(user => user === res.locals.user.uid)
    );

    if (!isEditor && !isOwner) {
      throw new APIError(
        403,
        'Permission denied. Only the editors of this item can access this resource.'
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default editorship;
