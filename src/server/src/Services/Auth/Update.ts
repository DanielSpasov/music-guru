import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ZodSchema } from 'zod';

import { EmailSchema, UsernameSchema } from '../../Database/Schemas';
import { User } from '../../Database/Types';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';
import env from '../../env';

const editableFieldSchemas: Record<string, ZodSchema> = {
  username: UsernameSchema,
  email: EmailSchema
};

export async function UpdateUser(req: Request, res: Response) {
  try {
    const field = req.query['field']?.toString() as keyof User;

    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const validData = editableFieldSchemas[field].parse(req.body[field]);

    const { uid } = jwt.verify(token, env.SECURITY.JWT_SECRET) as JwtPayload;

    const db = await connect();
    const collection = db.collection('users');
    await collection.updateOne({ uid }, { $set: { [field]: validData } });
    const data = await collection.findOne({ uid });

    res.status(200).json({ message: `User updated.`, data });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
