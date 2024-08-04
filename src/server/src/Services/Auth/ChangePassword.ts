import { Request, Response } from 'express';
import { Collection } from 'mongodb';
import bcrypt from 'bcrypt';

import { ChangePassSchema } from '../../Database/Schemas/User';
import { DBUser } from '../../Database/Types';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';
import SendEmail from '../Email';

export async function ChangePassword(req: Request, res: Response) {
  const mongo = await connect();
  try {
    const validated = ChangePassSchema.parse(req.body);

    if (validated.new_password !== validated.confirm_new_password) {
      return res.status(400).json({ message: "Passwords doesn't match." });
    }

    const db = mongo.db('models');
    const collection: Collection<DBUser> = db.collection('users');

    const user = await collection.findOne({ uid: res.locals.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'Invalid User UID.' });
    }

    if (!user.verified) {
      return res.status(400).json({
        message:
          'You need to verify your email before you can change your password.'
      });
    }

    const currentPassMatch = await bcrypt.compare(
      validated.current_password,
      user.password
    );
    if (!currentPassMatch) {
      return res.status(400).json({ message: 'Wrong password.' });
    }

    const newPassMatch = await bcrypt.compare(
      validated.new_password,
      user.password
    );
    if (newPassMatch) {
      return res
        .status(400)
        .json({ message: 'New Password cannot be your old password.' });
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
  } catch (error) {
    errorHandler(req, res, error);
  } finally {
    await mongo.close();
  }
}
