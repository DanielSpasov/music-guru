import { Request, Response } from 'express';

import { errorHandler } from '../../Error';

export async function Create(req: Request, res: Response) {
  try {
    console.log(req.body);
    res.status(200).json({ message: 'succ' });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
