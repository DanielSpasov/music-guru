import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { APIError } from '../Error';

export default async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers?.authorization || '';
    if (!token) throw new APIError(401, 'Unauthorized.');

    const { uid } = jwt.verify(
      token,
      process.env.JWT_SECRET || ''
    ) as JwtPayload;

    res.locals.user = { uid };

    next();
  } catch (err) {
    next(err);
  }
}
