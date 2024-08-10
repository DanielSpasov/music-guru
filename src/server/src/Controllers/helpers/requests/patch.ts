import { NextFunction, Request, Response } from 'express';

import { validationSchemas } from '../../../Database/Schemas';
import { connect } from '../../../Database';
import { APIError } from '../../../Error';
import { SimpleReqProps } from '../types';

export const patch =
  ({ collectionName }: SimpleReqProps) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const mongo = await connect();
    try {
      const db = mongo.db('models');
      const collection = db.collection(collectionName);
      const doc = collection.aggregate([{ $match: { uid: req.params.id } }]);
      const [item] = await doc.toArray();
      if (item.created_by !== res.locals.user.uid) {
        throw new APIError(403, 'Permission denied.');
      }

      const validationSchema = validationSchemas[collectionName];
      const validatedData = validationSchema.parse(req.body);

      await collection.findOneAndUpdate(
        { uid: req.params.id },
        {
          $set: {
            ...validatedData,
            image: item.image
          }
        },
        { upsert: true }
      );

      res.status(200).json({
        message: 'Success',
        data: { uid: req.params.id, name: validatedData.name }
      });
    } catch (err) {
      next(err);
    } finally {
      await mongo.close();
    }
  };
