import { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { jwtErrorHandler } from './jwtErrorHandler';
import { ZodError } from 'zod';

export function errorHandler(req: Request, res: Response, error: unknown) {
  try {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: error.issues[0]?.message || 'Validation Failed' });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      jwtErrorHandler(req, res, error);
      return;
    }

    res.status(400).json({ message: 'Bad Input.' });
  } catch (err: unknown) {
    res.status(500).json({ message: 'Unexpected Server Error.' });
  }
}
