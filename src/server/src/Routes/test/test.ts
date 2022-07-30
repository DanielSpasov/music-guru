import { Request, Response } from 'express';
import { IRoute } from '../../Interfaces';

export const Route: IRoute = {
  path: 'test',
  type: 'get',
  run: (req: Request, res: Response) => {
    res.status(200).json({ test: 'successful' });
  }
};
