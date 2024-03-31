import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { validationSchemas } from '../../../Database/Schemas';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';
import { SimpleReqProps } from '../types';
import env from '../../../env';

export function patch({ collectionName }: SimpleReqProps) {
  return async function (req: Request, res: Response) {
    try {
      const token = req.headers?.authorization;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
      }
      const { uid: userUID } = jwt.verify(
        token,
        env.SECURITY.JWT_SECRET
      ) as JwtPayload;

      const db = await connect('models');
      const collection = db.collection(collectionName);
      const doc = collection.aggregate([{ $match: { uid: req.params.id } }]);
      const [item] = await doc.toArray();
      if (item.created_by !== userUID) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      const validationSchema = validationSchemas[collectionName];
      const validatedData = validationSchema.parse(req.body);

      await collection.findOneAndUpdate(
        { uid: req.params.id },
        { $set: validatedData },
        { upsert: true }
      );

      res.status(200).json({
        message: 'Success',
        data: { uid: req.params.id, name: validatedData.name }
      });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
