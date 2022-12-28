import { Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

export function jwtErrorHandler(
  req: Request,
  res: Response,
  error: JsonWebTokenError
) {
  try {
    if (error.name === 'JsonWebTokenError') {
      res.status(400).json({ message: 'Invalid token.' });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to validate JWT.' });
  }
}
