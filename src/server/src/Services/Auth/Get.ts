import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { errorHandler } from '../../Error';
import { connect } from '../../Database';
import env from '../../env';

export async function GetUser(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const { uid } = jwt.verify(token, env.SECURITY.JWT_SECRET) as JwtPayload;

    const db = await connect('models');
    const collection = db.collection('users');
    const data = await collection.findOne({ uid });

    res.status(200).json({ message: `User updated.`, data });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
