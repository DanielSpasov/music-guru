import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { ExtendedRequest } from '../../Database';
import { errorHandler } from '../../Error';
import env from '../../env';

export async function GetUser(request: Request, res: Response) {
  const req = request as ExtendedRequest;
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const { uid } = jwt.verify(token, env.SECURITY.JWT_SECRET) as JwtPayload;

    const db = req.mongo.db('models');
    const collection = db.collection('users');
    const data = await collection.findOne({ uid });

    res.status(200).json({ data });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
