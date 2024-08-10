import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';

import { APIError } from '../Error';

export const errorHandlerr = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line -- Next funciton is required for express to acknowledge out error handler
  next: NextFunction
) => {
  if (err instanceof APIError) {
    return res.status(err.code).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues[0].message, err });
  }

  if (err instanceof JsonWebTokenError) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    }
    return res.status(401).json({ message: 'Invalid token.' });
  }

  return res.status(500).json({ message: 'Something went wrong.', err });
};
