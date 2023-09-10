import { DocumentData } from 'firebase/firestore/lite';
import jwt from 'jsonwebtoken';
import env from '../../env';

import SendEmail from '../Email';

export const sendVerificationEmail = async (user: DocumentData) => {
  const emailToken = jwt.sign({ id: user.uid }, env.JWT_SECRET, {
    expiresIn: '10m'
  });

  await SendEmail({
    to: user.email,
    template: 'VERIFY',
    data: { token: emailToken }
  });
};
