import nodemailer from 'nodemailer';

import templates from './templates';
import { Template } from './helpers';

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
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS
    }
  });

  await transporter.sendMail({
    to,
    from: `"Music Nerd" <${process.env.EMAIL_SERVICE_USER}>`,
    ...templates[template](data)
  });
}
