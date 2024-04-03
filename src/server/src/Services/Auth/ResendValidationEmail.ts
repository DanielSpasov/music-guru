import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { sendVerificationEmail } from './helpers';
import { ExtendedRequest } from '../../Database';
import { User } from '../../Database/Types';
import { errorHandler } from '../../Error';
import env from '../../env';

export async function ResendValidationEmail(request: Request, res: Response) {
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
    const user = await collection.findOne<User>({ uid });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    await sendVerificationEmail(user);

    res.status(200).json({ message: 'Verification Email Sent.' });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
