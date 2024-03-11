import { Router } from 'express';

import {
  SignUp,
  SignIn,
  ValidateToken,
  ValidateEmail,
  ResendValidationEmail,
  UpdateUser
} from '../../Services/Auth';
import { authorization } from '../../Middleware';
import { get } from '../helpers/requests';

const router = Router();

router.get('/validate-jwt', ValidateToken);

router.get('/resend-validation-email', authorization, ResendValidationEmail);
router.post('/validate-email', authorization, ValidateEmail);

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

router.get('/:id', get('users'));
router.patch('/:id', authorization, UpdateUser);

export default router;
