import { Request, Response } from 'express';

import { SingleModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';

export async function del(req: Request, res: Response) {
  try {
    await SingleModel.findOneAndRemove({ uid: req.params.id });
    res.status(200).json({ message: 'succ' });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
