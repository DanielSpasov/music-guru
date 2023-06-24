import { Router } from 'express';

import {
  SignUp,
  SignIn,
  ValidateToken,
  ResendValidationEmail
} from '../../Services/Auth';
import { UserModel, IUser } from '../../Database/Schemas';
import { authorization } from '../../Middleware';
import { get } from '../../Services/requests';
import { ValidateEmail } from '../../Services/Auth/ValidateEmail';

const router = Router();

router.get('/validate-jwt', ValidateToken);

router.get('/resend-validation-email', authorization, ResendValidationEmail);
router.post('/validate-email', authorization, ValidateEmail);

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

router.get('/:id', get<IUser>({ Model: UserModel }));

export default router;
