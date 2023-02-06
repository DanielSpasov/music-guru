import { Router } from 'express';

import UserController from './Models/User';

const router = Router();

router.use('/user', UserController);

export default router;
