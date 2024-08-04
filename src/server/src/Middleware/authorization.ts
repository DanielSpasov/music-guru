import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

    const { uid } = jwt.verify(
      token,
      process.env.SECURITY_JWT_SECRET || ''
    ) as JwtPayload;

    res.locals.user = { uid };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized.' });
  }
}
