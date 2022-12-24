import { Router, Request, Response } from 'express';

import UserController from './Controllers/User';

const router = Router();

router.use('/api/v1/user', UserController);

router.get('*', (req: Request, res: Response) => {
  res.status(404).json({ error: { message: 'Page not found' } });
});

export default router;
