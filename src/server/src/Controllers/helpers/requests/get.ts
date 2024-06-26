import { Request, Response } from 'express';

import { aggregators } from '../../../Database/Aggregators';
import { ExtendedRequest } from '../../../Database';
import { ReqProps, QueryProps } from '../types';
import { errorHandler } from '../../../Error';
import { serializeObj } from '../helpers';

export function get({ collectionName, databaseName }: ReqProps) {
  return async function (request: Request, res: Response) {
    const req = request as ExtendedRequest;
    try {
      const { serializer = 'list' }: QueryProps = req.query;

      const db = req.mongo.db(databaseName);
      const collection = db.collection(collectionName);

      const stages =
        databaseName === 'models'
          ? [{ $match: { uid: req.params.id } }, ...aggregators[collectionName]]
          : [];
      const items = collection.aggregate([...stages, { $project: { _id: 0 } }]);
      const [item] = await items.toArray();
      if (!item) {
        res.status(404).json({ message: 'Document not found.' });
        return;
      }

      const data = serializeObj(item, collectionName, serializer);

      res.status(200).json({ data });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
