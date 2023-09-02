import { doc, updateDoc } from 'firebase/firestore/lite';
import { Request, Response } from 'express';
import { ZodSchema } from 'zod';

import { User, emailSchema, usernameSchema } from '../../Database/Types/User';
import { errorHandler } from '../../Error';
import { getUser } from '../../Utils';
import db from '../../Database';

const editableFieldSchemas: Record<string, ZodSchema> = {
  username: usernameSchema,
  email: emailSchema
};

export async function UpdateUser(req: Request, res: Response) {
  try {
    const field = req.query['field']?.toString() as keyof User;

    const reference = doc(db, 'users', req.params.id);
    const validData = editableFieldSchemas[field].parse(req.body[field]);
    await updateDoc(reference, { [field]: validData });

    const user = await getUser(req.headers.authorization);
    res.status(200).json({ message: `User updated.`, data: user });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
