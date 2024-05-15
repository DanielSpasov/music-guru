import { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { ZodError } from 'zod';

export function errorHandler<T>(
  req: Request<object, object, object, T>,
  res: Response,
  error: unknown
) {
  console.log(error);
  try {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: error.issues[0]?.message || 'Validation Failed' });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      try {
        if (error.name === 'TokenExpiredError') {
          res.status(400).json({ message: 'Token expired.' });
          return;
        }
        if (error.name === 'JsonWebTokenError') {
          res.status(400).json({ message: 'Invalid token.' });
          return;
        }
      } catch (error) {
        res.status(400).json({ message: 'Failed to validate JWT.' });
      }
      return;
    }

    res.status(500).json({ message: error });
  } catch (err: unknown) {
    res.status(500).json({ message: 'Unexpected Server Error.' });
  }
}
