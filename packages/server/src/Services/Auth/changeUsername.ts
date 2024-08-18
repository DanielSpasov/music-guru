import { NextFunction, Request, Response } from 'express';

import { UsernameSchema } from '../../Validations';
import { serializers } from '../../Serializers';
import { APIError } from '../../Error';
import User from '../../Schemas/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let username = UsernameSchema.parse(req.body.username);

    if (!username) {
      const user = await User.findOne({ uid: res.locals.user.uid });
      if (!user) throw new APIError(404, 'Invalid User UID.');

      const emailUsername = user.email.split('@')[0];
      const discriminator = Math.floor(1000 + Math.random() * 9000);
      username = `${emailUsername}${discriminator}`;
    }

    const isUsedUsername = await User.findOne({ username });
    if (isUsedUsername) throw new APIError(400, 'This username is taken.');

    await User.updateOne({ uid: res.locals.user.uid }, { $set: { username } });

    const [data] = await User.aggregate()
      .match({ uid: res.locals.user.uid })
      .project({ ...serializers.users?.detailed, _id: 0 });

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};
