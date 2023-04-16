import { Request, Response, Router } from 'express';
import nodemailer from 'nodemailer';

import { SignUp, SignIn, ValidateToken } from '../../Services/Auth';

const router = Router();

router.get('/test-nodemailer', async (req: Request, res: Response) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS
    }
  });

  const code = Math.random().toString().substring(2, 8);

  await transporter.sendMail({
    from: `"Music Nerd" <${process.env.EMAIL_SERVICE_USER}>`,
    to: 'shadygotrabies@gmail.com',
    subject: '2FA Code',
    text: `2FA Code: ${code}`
  });

  res.status(200).json({ message: 'Email sent to @email.com' });
});

router.get('/validate-jwt', ValidateToken);

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

export default router;
