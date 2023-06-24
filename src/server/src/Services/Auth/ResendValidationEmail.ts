import { Request, Response } from 'express';

import { sendVerificationEmail } from './helpers';
import { errorHandler } from '../../Error';
import { getUser } from '../../Utils';

export async function ResendValidationEmail(req: Request, res: Response) {
  try {
    const user = await getUser(req.headers.authorization);
    await sendVerificationEmail(user);
    res.status(200).json({ message: 'Verification Email Sent.' });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
