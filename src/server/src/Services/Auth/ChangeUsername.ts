import { NextFunction, Request, Response } from 'express';
import { Collection } from 'mongodb';

import { UsernameSchema } from '../../Validations';
import { connect } from '../../Database';
import { APIError } from '../../Error';
import { DBUser } from '../../Types';

export const ChangeUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mongo = await connect();
  try {
    const validUsername = UsernameSchema.parse(req.body.username);

    let username = validUsername;

    const db = mongo.db('models');
    const collection: Collection<DBUser> = db.collection('users');

    if (!validUsername) {
      const user = await collection.findOne({ uid: res.locals.user.uid });
      if (!user) throw new APIError(404, 'Invalid User UID.');
      username = user.email.split('@')[0];
    }

    await collection.updateOne(
      { uid: res.locals.user.uid },
      { $set: { username } }
    );

    const items = collection.aggregate([
      { $match: { uid: res.locals.user.uid } },
      { $project: { _id: 0, password: 0 } }
    ]);
    const [data] = await items.toArray();

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
