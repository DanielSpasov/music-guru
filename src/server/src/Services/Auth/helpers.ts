import jwt from 'jsonwebtoken';
import env from '../../env';

import { User } from '../../Database/Types';
import SendEmail from '../Email';

export const sendVerificationEmail = async (user: User) => {
  const expToken = jwt.sign({ id: user.uid }, env.SECURITY.JWT_SECRET, {
    expiresIn: '10m'
  });

  await SendEmail({
    to: user.email,
    template: 'VERIFY',
    data: { expToken, username: user.username }
  });
};
