import { NextFunction, Request, Response } from 'express';

import { aggregators } from '../Database/Aggregators';
import { Models } from '../Database/Types';
import { connect } from '../Database';

export type GetProps = { database: 'models'; collection: Models };

export default function get({ database, collection }: GetProps) {
  return async function get(req: Request, res: Response, next: NextFunction) {
    const mongo = await connect();
    try {
      const db = mongo.db(database);
      const col = db.collection(collection);

      const item = await col
        .aggregate([
          { $match: { uid: req.params.id } },
          ...aggregators[collection],
          { $project: { _id: 0 } }
        ])
        .next();

      if (!item) {
        res.status(404).json({ message: 'Item not found.' });
        return;
      }

      res.locals.item = item;
      res.locals.collection = collection;
      res.locals.database = database;

      next();
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    } finally {
      mongo.close();
    }
  };
}
