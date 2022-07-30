import { Request, Response } from 'express';

export interface IRoute {
  path: string;
  type: 'get' | 'post' | 'put' | 'patch' | 'delete';
  run(req: Request, res: Response): void;
}
