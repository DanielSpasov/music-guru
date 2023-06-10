import { Router } from 'express';

import { SignUp, SignIn, ValidateToken } from '../../Services/Auth';

const router = Router();

router.get('/validate-jwt', ValidateToken);

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

export default router;
