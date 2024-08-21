import { NextFunction, Request, Response } from 'express';

import { serializers } from '../../Serializers';
import User from '../../Schemas/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;

    await User.updateOne({ uid: id }, { $set: { verified: true } });

    const [data] = await User.aggregate()
      .match({ uid: id })
      .project({ ...serializers.users?.detailed, _id: 0 });

    res.status(200).json({ message: 'Email Verified.', data });
  } catch (err) {
    next(err);
  }
};
