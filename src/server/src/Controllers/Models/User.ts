import { Router } from 'express';

import {
  SignUp,
  SignIn,
  ValidateToken,
  ValidateEmail,
  ResendValidationEmail,
  UpdateUser,
  GetUser
} from '../../Services/Auth';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/validate-jwt', ValidateToken);

router.get('/resend-validation-email', authorization, ResendValidationEmail);
router.post('/validate-email', authorization, ValidateEmail);

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

router.get('/:id', GetUser);
router.patch('/:id', authorization, UpdateUser);

export default router;
