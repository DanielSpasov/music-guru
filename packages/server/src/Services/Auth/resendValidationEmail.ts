import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import SendEmail from '../Email';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expToken = jwt.sign(
      { id: res.locals.user.uid },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '10m'
      }
    );

    await SendEmail({
      to: res.locals.user.email,
      template: 'VERIFY',
      data: { expToken, username: res.locals.user.username }
    });

    res.status(200).json({ message: 'Verification Email Sent.' });
  } catch (err) {
    next(err);
  }
};
