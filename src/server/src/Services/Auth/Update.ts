import { Request, Response } from 'express';
import { ZodSchema } from 'zod';

import { EmailSchema, UsernameSchema } from '../../Database/Schemas';
import { User } from '../../Database/Types';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';

const editableFieldSchemas: Record<string, ZodSchema> = {
  username: UsernameSchema,
  email: EmailSchema
};

export async function UpdateUser(req: Request, res: Response) {
  const mongo = await connect();
  try {
    const field = req.query['field']?.toString() as keyof User;

    const validData = editableFieldSchemas[field].parse(req.body[field]);

    const db = mongo.db('models');
    const collection = db.collection('users');
    await collection.updateOne(
      { uid: res.locals.user.uid },
      { $set: { [field]: validData } }
    );
    const data = await collection.findOne({ uid: res.locals.user.uid });

    res.status(200).json({ message: `User updated.`, data });
  } catch (error) {
    errorHandler(req, res, error);
  } finally {
    mongo.close();
  }
}
