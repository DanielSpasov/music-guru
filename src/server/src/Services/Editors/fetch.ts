import { NextFunction, Request, Response } from 'express';
import { Collection } from 'mongodb';

import { DBUser } from '../../Types';
import { connect } from '../../Database';
import { QueryProps, useFilters } from '../../Utils';
import User from '../../Schemas/User';

interface Query {
  limit?: string;
  [key: string]: string | undefined;
}

export default async (
  req: Request<object, object, object, Query>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = '25', ...query } = req.query as QueryProps;

    const item = res.locals.item;

    const editorUIDs = item.editors.map(x => x.uid);
    const availableEditors = await User.aggregate([
      { $match: { uid: { $nin: editorUIDs, $ne: item.created_by.uid } } },
      ...useFilters(query),
      { $project: { _id: 0 } },
      { $limit: Number(limit) }
    ]).toArray();

    const data = availableEditors.map(serializers.users.list);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};
