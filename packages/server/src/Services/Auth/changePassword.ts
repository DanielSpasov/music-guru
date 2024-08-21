import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { ChangePassSchema } from '../../Validations/User';
import { serializers } from '../../Serializers';
import { APIError } from '../../Error';
import User from '../../Schemas/User';
import SendEmail from '../Email';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = ChangePassSchema.parse(req.body);

    if (validated.new_password !== validated.confirm_new_password) {
      throw new APIError(400, "Passwords doesn't match.");
    }

    if (!res.locals.user.verified) {
      throw new APIError(
        400,
        'You need to verify your email before you can change your password.'
      );
    }

    const currentPassMatch = await bcrypt.compare(
      validated.current_password,
      res.locals.user.password
    );
    if (!currentPassMatch) throw new APIError(400, 'Wrong password.');

    const newPassMatch = await bcrypt.compare(
      validated.new_password,
      res.locals.user.password
    );
    if (newPassMatch) {
      throw new APIError(400, 'New Password cannot be your old password.');
    }

    const saltRounds = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const newPasswordHash = await bcrypt.hash(validated.new_password, salt);

    await User.updateOne(
      { uid: res.locals.user.uid },
      { $set: { password: newPasswordHash } }
    );

    const [data] = await User.aggregate([{ $project: { _id: 0, password: 0 } }])
      .match({ uid: res.locals.user.uid })
      .project({ ...serializers.users?.detailed, _id: 0 });

    await SendEmail({
      to: res.locals.user.email,
      template: 'PASSWORD_CHANGED',
      data: { username: res.locals.user.username }
    });

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};
