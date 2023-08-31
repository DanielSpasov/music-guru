import { Router } from 'express';

import {
  SignUp,
  SignIn,
  ValidateToken,
  ResendValidationEmail
} from '../../Services/Auth';
import { ValidateEmail } from '../../Services/Auth/ValidateEmail';
import { UserModel, IUser } from '../../Database/Models';
import { authorization } from '../../Middleware';
import { UpdateUser } from '../../Services/User';
import { get } from '../../Services/requests';

const router = Router();

router.get('/validate-jwt', ValidateToken);

router.get('/resend-validation-email', authorization, ResendValidationEmail);
router.post('/validate-email', authorization, ValidateEmail);

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

router.get('/:id', get<IUser>({ Model: UserModel }));
router.patch('/:id', authorization, UpdateUser);

export default router;
