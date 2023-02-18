import { Request, Response } from 'express';

import { CustomError } from '../../Error/CustomError';
import { SingleModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';

export async function get(req: Request, res: Response) {
  try {
    const single = await SingleModel.findOne({ uid: req.params.id })
      .populate('artist')
      .populate('created_by');
    if (!single) {
      throw new CustomError({ message: 'Single not Found.', code: 404 });
    }

    res.status(200).json({ data: single.toJSON() });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
