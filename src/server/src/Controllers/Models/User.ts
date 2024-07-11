import { Router } from 'express';

import {
  SignUp,
  SignIn,
  ValidateToken,
  ValidateEmail,
  ResendValidationEmail,
  ChangeUsername,
  ChangePassword,
  GetUser
} from '../../Services/Auth';
import { authorization } from '../../Middleware';
import { fetch } from '../helpers/requests';

const router = Router();

router.get(
  '/',
  authorization,
  fetch({ collectionName: 'users', databaseName: 'models' })
);

router.get('/validate-jwt', ValidateToken);

router.get('/resend-validation-email', authorization, ResendValidationEmail);
router.post('/validate-email', authorization, ValidateEmail);

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

router.get('/:id', authorization, GetUser);

router.patch('/username', authorization, ChangeUsername);
router.patch('/password', authorization, ChangePassword);

export default router;
