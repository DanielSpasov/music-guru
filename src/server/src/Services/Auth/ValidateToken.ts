import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { errorHandler } from '../../Error';

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

    const secret = process.env.SECURITY_JWT_SECRET;
    if (!secret) {
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
    const payload = jwt.verify(token, secret) as JwtPayload;

    res.status(200).json(payload);
  } catch (error) {
    errorHandler(req, res, error);
  }
}
