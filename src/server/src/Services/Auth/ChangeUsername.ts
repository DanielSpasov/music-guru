import { Request, Response } from 'express';

import { UsernameSchema } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';
import { Collection } from 'mongodb';
import { DBUser } from '../../Database/Types';

export async function ChangeUsername(req: Request, res: Response) {
  const mongo = await connect();
  try {
    const validUsername = UsernameSchema.parse(req.body.username);

    let username = validUsername;

    const db = mongo.db('models');
    const collection: Collection<DBUser> = db.collection('users');

    if (!validUsername) {
      const user = await collection.findOne({ uid: res.locals.user.uid });
      if (!user) return res.status(404).json({ message: 'Invalid User UID.' });
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
  } catch (error) {
    errorHandler(req, res, error);
  } finally {
    await mongo.close();
  }
}
