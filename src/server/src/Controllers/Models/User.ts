import { Router } from 'express';

import { SignUp, Post } from '../../Services/User';

const router = Router();

router.post('/sign-up', SignUp);
router.post('/', Post);

export default router;
