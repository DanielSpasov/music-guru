import nodemailer from 'nodemailer';

import templates from './templates';
import { Template } from './helpers';
import env from '../../env';

export default async function SendEmail({
  to,
  template,
  data
}: {
  to: string;
  template: Template;
  data?: Record<string, any>;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_SERVICE_USER,
      pass: env.EMAIL_SERVICE_PASS
    }
  });

  await transporter.sendMail({
    to,
    from: `"Music Nerd" <${env.EMAIL_SERVICE_USER}>`,
    ...templates[template](data)
  });
}
