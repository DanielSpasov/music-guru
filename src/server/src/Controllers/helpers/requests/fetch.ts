import { Request, Response } from 'express';

import { aggregators } from '../../../Database/Aggregators';
import { QueryProps, ReqProps } from '../types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';
import { serializeObj } from '../helpers';

export function fetch({ collectionName, databaseName }: ReqProps) {
  return async function (req: Request, res: Response) {
    const mongo = await connect();
    try {
      const { serializer = 'list', ...params }: QueryProps = req.query;

      const filters = Object.entries(params).map(([name, value]) => ({
        $match: { [name]: { $regex: value, $options: 'i' } }
      }));

      const db = mongo.db(databaseName);
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
    } finally {
      mongo.close();
    }
  };
}
