import { NextFunction, Request, Response } from 'express';
import { Collection } from 'mongodb';

import { serializers } from '../../Database/Serializers';
import { DBUser, User } from '../../Database/Types';
import { connect } from '../../Database';
import { useFilters } from '../../Utils';

interface Query {
  limit?: string;
  [key: string]: string | undefined;
}

export default async (
  req: Request<object, object, object, Query>,
  res: Response,
  next: NextFunction
) => {
  const mongo = await connect();
  try {
    const { limit = 25, ...params } = req.query;

    const filters = useFilters(params);

    const item = res.locals.item;

    const db = mongo.db('models');
    const userCollection: Collection<DBUser> = db.collection('users');

    const editorUIDs = item.editors.map((x: User) => x.uid);
    const availableEditors = await userCollection
      .aggregate([
        { $match: { uid: { $nin: editorUIDs, $ne: item.created_by.uid } } },
        ...filters,
        { $project: { _id: 0 } },
        { $limit: Number(limit) }
      ])
      .toArray();

    const data = availableEditors.map(serializers.users.list);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
