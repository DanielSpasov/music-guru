import { NextFunction, Request, Response } from 'express';
import { Collection } from 'mongodb';
import bcrypt from 'bcrypt';

import { ChangePassSchema } from '../../Database/Schemas/User';
import { DBUser } from '../../Database/Types';
import { connect } from '../../Database';
import { APIError } from '../../Error';
import SendEmail from '../Email';

export const ChangePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mongo = await connect();
  try {
    const validated = ChangePassSchema.parse(req.body);

    if (validated.new_password !== validated.confirm_new_password) {
      throw new APIError(400, "Passwords doesn't match.");
    }

    const db = mongo.db('models');
    const collection: Collection<DBUser> = db.collection('users');

    const user = await collection.findOne({ uid: res.locals.user.uid });
    if (!user) throw new APIError(404, 'Invalid User UID.');

    if (!user.verified) {
      throw new APIError(
        400,
        'You need to verify your email before you can change your password.'
      );
    }

    const currentPassMatch = await bcrypt.compare(
      validated.current_password,
      user.password
    );
    if (!currentPassMatch) throw new APIError(400, 'Wrong password.');

    const newPassMatch = await bcrypt.compare(
      validated.new_password,
      user.password
    );
    if (newPassMatch) {
      throw new APIError(400, 'New Password cannot be your old password.');
    }

    const saltRounds = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const newPasswordHash = await bcrypt.hash(validated.new_password, salt);

    await collection.updateOne(
      { uid: res.locals.user.uid },
      { $set: { password: newPasswordHash } }
    );

    const items = collection.aggregate([
      { $match: { uid: res.locals.user.uid } },
      { $project: { _id: 0, password: 0 } }
    ]);
    const [data] = await items.toArray();

    await SendEmail({
      to: user.email,
      template: 'PASSWORD_CHANGED',
      data: { username: user.username }
    });

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
