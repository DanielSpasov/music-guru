import { DocumentData } from 'firebase/firestore/lite';
import jwt from 'jsonwebtoken';

import SendEmail from '../Email';

export const sendVerificationEmail = async (user: DocumentData) => {
  const jwtSecret = String(process.env.JWT_SECRET);
  const emailToken = jwt.sign({ id: user.uid }, jwtSecret, {
    expiresIn: '10m'
  });

  await SendEmail({
    to: user.email,
    template: 'VERIFY',
    data: { token: emailToken }
  });
};
