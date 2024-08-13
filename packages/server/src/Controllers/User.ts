import { Router } from 'express';

import { authorization } from '../Middlewares';
import { methods, auth } from '../Services';

const router = Router();

router.get('/', methods.fetch({ model: 'users' }));

router.get('/validate-jwt', auth.validateToken);

router.get(
  '/resend-validation-email',
  authorization,
  auth.resendValidationEmail
);
router.post('/validate-email', authorization, auth.validateEmail);

router.post('/sign-up', auth.signUp);
router.post('/sign-in', auth.signIn);

router.get('/:id', authorization, methods.get({ model: 'users' }));

router.patch('/username', authorization, auth.changeUsername);
router.patch('/password', authorization, auth.changePassword);

export default router;
