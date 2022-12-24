import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  console.log(req);
  res.status(200).json({ message: 'Signing up' });
});

export default router;
