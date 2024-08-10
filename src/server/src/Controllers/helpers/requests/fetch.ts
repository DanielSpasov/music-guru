import { NextFunction, Request, Response } from 'express';

import { aggregators } from '../../../Aggregators';
import { QueryProps, ReqProps } from '../types';
import { connect } from '../../../Database';
import { serializeObj } from '../helpers';

export const fetch =
  ({ collectionName, databaseName }: ReqProps) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const mongo = await connect();
    try {
      const { serializer = 'list', ...params }: QueryProps = req.query;

      const filters = Object.entries(params).map(([name, value]) => {
        const isBool = value === 'true' || value === 'false';
        const isNegation = name.startsWith('-');
        const fieldName = isNegation ? name.substring(1) : name;

        if (isBool) {
          return {
            $match: {
              [fieldName]: { [isNegation ? '$ne' : '$eq']: value === 'true' }
            }
          };
        }

        return {
          $match: {
            [fieldName]: isNegation
              ? { $not: { $regex: value, $options: 'i' } }
              : { $regex: value, $options: 'i' }
          }
        };
      });

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
    } catch (err) {
      next(err);
    } finally {
      await mongo.close();
    }
  };
