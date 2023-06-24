import { Request, Response } from 'express';

import { errorHandler } from '../../Error';
import { UserModel } from '../../Database/Schemas';
import { CustomError } from '../../Error/CustomError';

export async function ValidateEmail(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const user = await UserModel.findById(id);
    if (!user) {
      throw new CustomError({
        code: 400,
        message: 'Failed to validate Email.'
      });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: 'Email Verified.' });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
