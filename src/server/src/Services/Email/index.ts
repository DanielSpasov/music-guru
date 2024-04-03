import nodemailer from 'nodemailer';

import templates from './templates';
import { Template } from './helpers';
import env from '../../env';

export default async function SendEmail({
  to,
  template,
  expToken
}: {
  to: string;
  template: Template;
  expToken?: string;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL.SERVICE_USER,
      pass: env.EMAIL.SERVICE_PASS
    }
  });

  await transporter.sendMail({
    to,
    from: `"Music Guru" <${env.EMAIL.SERVICE_USER}>`,
    ...templates[template](expToken)
  });
}
