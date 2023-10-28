import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { errorHandler } from '../../Error';
import env from '../../env';

interface JwtPayload {
  uid: string;
}

export function ValidateToken(req: Request, res: Response) {
  try {
    const token = req.query?.token as string;
    if (!token) {
      res.status(400).json({ message: 'No Token was found.' });
      return;
    }

    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    res.status(200).json(payload);
  } catch (error) {
    errorHandler(req, res, error);
  }
}
