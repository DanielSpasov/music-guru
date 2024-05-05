import { Request, Response } from 'express';

import { errorHandler } from '../../Error';
import { connect } from '../../Database';

export async function GetUser(req: Request, res: Response) {
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
  } catch (error) {
    errorHandler(req, res, error);
  } finally {
    mongo.close();
  }
}
