import { Request, Response } from 'express';

import { User, emailSchema, usernameSchema } from '../../Types/User';
import { CustomError } from '../../Error/CustomError';
import { errorHandler } from '../../Error';
import { getUser } from '../../Utils';
import { ZodSchema } from 'zod';

const editableFieldSchemas: Record<string, ZodSchema> = {
  username: usernameSchema,
  email: emailSchema
};

export async function UpdateUser(req: Request, res: Response) {
  try {
    const field = req.query['field']?.toString() as keyof User;
    const payload = req.body;

    const user = await getUser(req.headers.authorization);
    if (!user[field]) {
      throw new CustomError({
        code: 400,
        message: `User has no property ${field}`
      });
    }

    const validData = editableFieldSchemas[field].parse(payload[field]);
    user[field] = validData;
    await user.save();

    res.status(200).json({ message: `User updated.`, data: user });
  } catch (error) {
    // console.log(error);
    errorHandler(req, res, error);
  }
}
