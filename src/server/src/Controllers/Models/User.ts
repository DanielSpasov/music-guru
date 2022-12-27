import { Router } from 'express';

import { SignUp, Post, ValidateToken } from '../../Services/User';

const router = Router();

router.get('/validate-jwt', ValidateToken);

router.post('/sign-up', SignUp);
router.post('/', Post);

export default router;
