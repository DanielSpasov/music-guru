import { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response } from 'express';

export function jwtErrorHandler(
  req: Request,
  res: Response,
  error: JsonWebTokenError
) {
  try {
    if (error.name === 'TokenExpiredError') {
      res.status(400).json({ message: 'Verification email has expired.' });
      return;
    }
    if (error.name === 'JsonWebTokenError') {
      res.status(400).json({ message: 'Invalid token.' });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to validate JWT.' });
  }
}
