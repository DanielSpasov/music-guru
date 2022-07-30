import { Router, Response } from 'express';

const Routes = Router();

Routes.use('/api/v1', (_, res: Response) => res.send('test'));

Routes.get('*', (_, res: Response) => {
  res.status(404).json({ error: { message: 'Page not found' } });
});

export default Routes;
