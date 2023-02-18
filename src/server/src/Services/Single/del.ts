import { Request, Response } from 'express';

import { CustomError } from '../../Error/CustomError';
import { SingleModel } from '../../Database/Schemas';
import { Single } from '../../Types/Single';
import { errorHandler } from '../../Error';
import getUser from '../../Utils/getUser';

export async function del(req: Request, res: Response) {
  try {
    const user = await getUser(req.headers?.authorization);

    const singleDoc = await SingleModel.findOne({
      uid: req.params.id
    }).populate('created_by');
    const single = singleDoc as unknown as Single;
    if (!single) {
      throw new CustomError({ message: 'Single not found.', code: 404 });
    }

    if (single.created_by.uid !== user.uid) {
      res.status(401).json({ message: 'Permission denied.' });
      return;
    }

    await SingleModel.findOneAndRemove({ uid: req.params.id });
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
