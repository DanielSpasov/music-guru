import nodemailer from 'nodemailer';

import templates from './templates';
import { Template } from './helpers';

export default async function SendEmail({
  to,
  template
}: {
  to: string;
  template: Template;
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
    ...templates[template]
  });
}
