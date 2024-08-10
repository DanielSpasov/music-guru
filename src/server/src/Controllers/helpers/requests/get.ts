import { NextFunction, Request, Response } from 'express';

import { aggregators } from '../../../Aggregators';
import { ReqProps, QueryProps } from '../types';
import { connect } from '../../../Database';
import { APIError } from '../../../Error';
import { serializeObj } from '../helpers';

export const get =
  ({ collectionName, databaseName }: ReqProps) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const mongo = await connect();
    try {
      const { serializer = 'list' }: QueryProps = req.query;

      const db = mongo.db(databaseName);
      const collection = db.collection(collectionName);

      const stages =
        databaseName === 'models'
          ? [{ $match: { uid: req.params.id } }, ...aggregators[collectionName]]
          : [];
      const items = collection.aggregate([...stages, { $project: { _id: 0 } }]);
      const [item] = await items.toArray();
      if (!item) throw new APIError(404, 'Document not found.');

      const data = serializeObj(item, collectionName, serializer);

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    } finally {
      await mongo.close();
    }
  };
