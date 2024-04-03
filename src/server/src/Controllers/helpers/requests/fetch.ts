import { Request, Response } from 'express';

import { aggregators } from '../../../Database/Aggregators';
import { ExtendedRequest } from '../../../Database';
import { QueryProps, ReqProps } from '../types';
import { errorHandler } from '../../../Error';
import { serializeObj } from '../helpers';

export function fetch({ collectionName, databaseName }: ReqProps) {
  return async function (request: Request, res: Response) {
    const req = request as ExtendedRequest;
    try {
      const { serializer = 'list', ...params }: QueryProps = req.query;

      const filters = Object.entries(params).map(([name, value]) => ({
        $match: { [name]: { $regex: value, $options: 'i' } }
      }));

      const db = req.mongo.db(databaseName);
      const collection = db.collection(collectionName);

      const stages =
        databaseName === 'models' ? aggregators[collectionName] : [];
      const items = collection.aggregate([
        ...stages,
        ...filters,
        { $project: { _id: 0 } }
      ]);

      const docs = await items.toArray();

      const data = docs.map(doc => {
        if (databaseName !== 'models') return doc;
        return serializeObj(doc, collectionName, serializer);
      });

      res.status(200).json({ data });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
