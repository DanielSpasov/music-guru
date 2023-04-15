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

  const info = await transporter.sendMail({
    from: `"Music Nerd Accounts" <${process.env.EMAIL_SERVICE_USER}>`,
    to: 'shadygotrabies@gmail.com',
    subject: 'Test Subject',
    text: 'Test Text',
    html: '<b>Test HTML</b>'
  });

  res.status(200).json({
    message: 'Successful',
    info
  });
});

router.get('/validate-jwt', ValidateToken);

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

export default router;
