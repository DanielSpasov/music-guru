import { NextFunction, Request, Response } from 'express';

import { aggregators } from '../Database/Aggregators';
import { Models } from '../Database/Types';
import { connect } from '../Database';
import { APIError } from '../Error';

export type GetProps = { database: 'models'; collection: Models };

export default ({ database, collection }: GetProps) =>
  async (req: Request, res: Response, next: NextFunction) => {
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

      if (!item) throw new APIError(404, 'Item not found.');

      res.locals.item = item;
      res.locals.collection = collection;
      res.locals.database = database;

      next();
    } catch (err) {
      next(err);
    } finally {
      await mongo.close();
    }
  };
