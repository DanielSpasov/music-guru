import { NextFunction, Request, Response } from 'express';

export default async function ownership(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (res.locals?.item?.created_by !== res.locals.user.uid) {
      res.status(403).json({
        message:
          'Permission denied. Only the creator of this item can access this resource.'
      });
      return;
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}
