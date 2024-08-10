import { NextFunction, Request, Response } from 'express';

import { sendVerificationEmail } from './helpers';
import { connect } from '../../Database';
import { APIError } from '../../Error';
import { User } from '../../Types';

export const ResendValidationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection = db.collection('users');
    const user = await collection.findOne<User>({ uid: res.locals.user.uid });

    if (!user) throw new APIError(404, 'User not found.');

    await sendVerificationEmail(user);

    res.status(200).json({ message: 'Verification Email Sent.' });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
