import { HydratedDocument } from 'mongoose';
import jwt from 'jsonwebtoken';

import { User } from '../../Types/User';
import SendEmail from '../Email';

export const sendVerificationEmail = async (user: HydratedDocument<User>) => {
  const jwtSecret = String(process.env.JWT_SECRET);
  const emailToken = jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: '10m'
  });

  await SendEmail({
    to: user.email,
    template: 'VERIFY',
    data: { token: emailToken }
  });
};
