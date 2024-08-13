import { NextFunction, Request, Response } from 'express';

import { UsernameSchema } from '../../Validations';
import { serializers } from '../../Serializers';
import { APIError } from '../../Error';
import User from '../../Schemas/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUsername = UsernameSchema.parse(req.body.username);

    let username = validUsername;

    if (!validUsername) {
      const user = await User.findOne({ uid: res.locals.user.uid });
      if (!user) throw new APIError(404, 'Invalid User UID.');
      username = user.email.split('@')[0];
    }

    await User.updateOne({ uid: res.locals.user.uid }, { $set: { username } });

    const [data] = await User.aggregate()
      .match({ uid: res.locals.user.uid })
      .project({ ...serializers.users?.detailed, _id: 0 });

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};
