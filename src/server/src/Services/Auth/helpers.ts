import jwt from 'jsonwebtoken';

import { User } from '../../Database/Types';
import SendEmail from '../Email';

export const sendVerificationEmail = async (user: User) => {
  const secret = process.env.SECURITY_JWT_SECRET;
  if (!secret) return;

  const expToken = jwt.sign({ id: user.uid }, secret, {
    expiresIn: '10m'
  });

  await SendEmail({
    to: user.email,
    template: 'VERIFY',
    data: { expToken, username: user.username }
  });
};
