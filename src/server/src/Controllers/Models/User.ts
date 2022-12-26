import { Router } from 'express';

import { SignUp } from '../../Services/User';

const router = Router();

router.post('/', SignUp);

export default router;
