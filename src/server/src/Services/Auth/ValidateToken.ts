import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { CustomError } from '../../Error/CustomError';
import { errorHandler } from '../../Error';

interface JwtPayload {
  uid: string;
}

export function ValidateToken(req: Request, res: Response) {
  try {
    const token = req.query?.token as string;
    if (!token) {
      throw new CustomError({ message: 'No Token was found.', code: 400 });
    }

    const secret = process.env.JWT_SECRET || '';
    const payload = jwt.verify(token, secret) as JwtPayload;

    res.status(200).json(payload);
  } catch (error) {
    errorHandler(req, res, error);
  }
}
