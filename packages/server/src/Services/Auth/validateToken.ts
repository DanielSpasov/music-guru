import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { APIError } from '../../Error';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.query?.token as string;
    if (!token) throw new APIError(400, 'No Token was found.');

    const payload = jwt.verify(token, process.env.JWT_SECRET || '') as {
      uid: string;
    };

    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};
