import { Error as MongooseError } from 'mongoose';
import { Request, Response } from 'express';

export function mongooseErrorHandler(
  req: Request,
  res: Response,
  error: MongooseError.ValidationError
) {
  try {
    const errors = JSON.parse(JSON.stringify(error?.errors));
    const firstError = Object.keys(errors)?.[0];

    res.status(400).json({ message: `${firstError} validation failed.` });
  } catch (error) {
    res.status(400).json({ message: 'Validation Failed.' });
  }
}
