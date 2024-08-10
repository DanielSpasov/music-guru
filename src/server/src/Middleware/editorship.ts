import { NextFunction, Request, Response } from 'express';

import { ListUser } from '../Database/Serializers/User';
import { APIError } from '../Error';

export default async function editorship(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const isOwner = res.locals?.item?.created_by?.uid === res.locals.user.uid;
    const isEditor = Boolean(
      res.locals?.item?.editors?.find(
        (user: ListUser) => user.uid === res.locals.user.uid
      )
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
}
