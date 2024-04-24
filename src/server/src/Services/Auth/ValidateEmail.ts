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

    res.status(200).json({ message: 'Email Verified.' });
  } catch (error) {
    errorHandler(req, res, error);
  } finally {
    mongo.close();
  }
}
