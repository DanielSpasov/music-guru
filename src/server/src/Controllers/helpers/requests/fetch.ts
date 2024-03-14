import { Request, Response } from 'express';

import { aggregators } from '../../../Database/Aggregators';
import { QueryProps, ReqProps } from '../types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';
import { serializeObj } from '../helpers';

export function fetch({ collectionName, databaseName }: ReqProps) {
  return async function (req: Request, res: Response) {
    try {
      const { serializer = 'list', ...params }: QueryProps = req.query;

      const filters = Object.entries(params).map(([name, value]) => ({
        $match: { [name]: { $regex: value, $options: 'i' } }
      }));

      const db = await connect(databaseName);
      const collection = db.collection(collectionName);
      const items = collection.aggregate(
        databaseName === 'models'
          ? [...aggregators[collectionName], ...filters]
          : []
      );
      const docs = await items.toArray();

      const data = docs.map(doc =>
        serializeObj(doc, collectionName, serializer)
      );

      res.status(200).json({ data });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
