import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { APIError } from '../../Error';
import User from '../../Schemas/User';
import SendEmail from '../Email';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [user] = await User.aggregate().match({ uid: res.locals.user.uid });
    if (!user) throw new APIError(404, 'User not found.');

    const expToken = jwt.sign({ id: user.uid }, process.env.JWT_SECRET || '', {
      expiresIn: '10m'
    });

    await SendEmail({
      to: user.email,
      template: 'VERIFY',
      data: { expToken, username: user.username }
    });

    res.status(200).json({ message: 'Verification Email Sent.' });
  } catch (err) {
    next(err);
  }
};
