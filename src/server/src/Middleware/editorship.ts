import { NextFunction, Request, Response } from 'express';
import { ListUser } from '../Database/Serializers/User';

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
      res.status(403).json({
        message:
          'Permission denied. Only the editors of this item can access this resource.'
      });
      return;
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}
