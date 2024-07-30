import { Request, Response } from 'express';

import { errorHandler } from '../../Error';
import { connect } from '../../Database';

export async function ValidateEmail(req: Request, res: Response) {
  const mongo = await connect();
  try {
    const { id } = req.body;

    const db = mongo.db('models');
    const collection = db.collection('users');
    const user = await collection.findOne({ uid: id });
    if (!user) {
      res.status(400).json({ message: 'Failed to validate Email.' });
      return;
    }

    await collection.updateOne({ uid: id }, { $set: { verified: true } });

    const items = collection.aggregate([
      { $match: { uid: id } },
      { $project: { _id: 0, password: 0 } }
    ]);
    const [data] = await items.toArray();

    res.status(200).json({ message: 'Email Verified.', data });
  } catch (error) {
    errorHandler(req, res, error);
  } finally {
    await mongo.close();
  }
}
