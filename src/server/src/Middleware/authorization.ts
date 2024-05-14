import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../env';

export default async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers?.authorization || '';
    if (!token) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const secret = env.SECURITY.JWT_SECRET || '';
    const { uid } = jwt.verify(token, secret) as JwtPayload;

    res.locals['user.uid'] = uid;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized.' });
  }
}
