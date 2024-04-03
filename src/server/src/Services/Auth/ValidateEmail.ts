import { Request, Response } from 'express';

import { ExtendedRequest } from '../../Database';
import { errorHandler } from '../../Error';

export async function ValidateEmail(request: Request, res: Response) {
  const req = request as ExtendedRequest;
  try {
    const { id } = req.body;

    const db = req.mongo.db('models');
    const collection = db.collection('users');
    const user = await collection.findOne({ uid: id });
    if (!user) {
      res.status(400).json({ message: 'Failed to validate Email.' });
      return;
    }

    await collection.updateOne({ uid: id }, { $set: { verified: true } });

    res.status(200).json({ message: 'Email Verified.' });
  } catch (error) {
    console.log(error);
    errorHandler(req, res, error);
  }
}
