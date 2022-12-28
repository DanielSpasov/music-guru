import { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';

import { mongooseErrorHandler } from './mongooseErrorHandler';
import { jwtErrorHandler } from './jwtErrorHandler';
import { CustomError } from './CustomError';

export function errorHandler(req: Request, res: Response, error: any) {
  try {
    if (error instanceof CustomError) {
      res.status(error.code).json({ message: error.message });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      jwtErrorHandler(req, res, error);
      return;
    }

    if (error instanceof MongooseError.ValidationError) {
      mongooseErrorHandler(req, res, error);
      return;
    }

    res.status(400).json({ message: 'Bad Input.' });
  } catch (err: any) {
    res.status(500).json({ message: 'Unexpected Server Error.' });
  }
}
