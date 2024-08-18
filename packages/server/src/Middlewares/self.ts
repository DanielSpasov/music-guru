import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { APIError } from '../Error';

const self = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization || '';
    if (!token) throw new APIError(401, 'Unauthorized.');

    const { uid } = jwt.verify(
      token,
      process.env.JWT_SECRET || ''
    ) as JwtPayload;

    if (req.params.id !== uid) throw new APIError(403, 'Permission denied.');

    next();
  } catch (err) {
    next(err);
  }
};

export default self;
