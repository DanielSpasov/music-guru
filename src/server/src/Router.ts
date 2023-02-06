import { Router, Request, Response } from 'express';

import APIController from './Controllers/API';

const router = Router();

router.use('/api/v1', APIController);

router.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Page not found' });
});

export default router;
