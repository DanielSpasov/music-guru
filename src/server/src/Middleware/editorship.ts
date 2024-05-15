import { NextFunction, Request, Response } from 'express';

export default async function editorship(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      !res.locals?.item?.editors?.includes(res.locals.user.uid) &&
      res.locals?.item?.created_by?.uid !== res.locals.user.uid
    ) {
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
