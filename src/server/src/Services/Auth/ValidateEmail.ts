import { NextFunction, Request, Response } from 'express';

import { connect } from '../../Database';
import { APIError } from '../../Error';

export const ValidateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mongo = await connect();
  try {
    const { id } = req.body;

    const db = mongo.db('models');
    const collection = db.collection('users');
    const user = await collection.findOne({ uid: id });
    if (!user) throw new APIError(400, 'Failed to validate Email.');

    await collection.updateOne({ uid: id }, { $set: { verified: true } });

    const items = collection.aggregate([
      { $match: { uid: id } },
      { $project: { _id: 0, password: 0 } }
    ]);
    const [data] = await items.toArray();

    res.status(200).json({ message: 'Email Verified.', data });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
