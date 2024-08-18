import { Router } from 'express';

import { methods, auth } from '../Services';
import { self } from '../Middlewares';

const router = Router();

router.get('/', methods.fetch({ model: 'users' }));

router.get('/validate-jwt', auth.validateToken);

router.get('/resend-validation-email', self, auth.resendValidationEmail);
router.post('/validate-email', self, auth.validateEmail);

router.post('/sign-up', auth.signUp);
router.post('/sign-in', auth.signIn);

router.get('/:id', self, methods.get({ model: 'users' }));

router.patch('/username', self, auth.changeUsername);
router.patch('/password', self, auth.changePassword);

export default router;
