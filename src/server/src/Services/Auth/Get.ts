import { NextFunction, Request, Response } from 'express';

import { connect } from '../../Database';

export const GetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection = db.collection('users');
    const docs = collection.aggregate([
      { $match: { uid: req.params.id } },
      { $project: { _id: 0, password: 0 } }
    ]);
    const [data] = await docs.toArray();

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
