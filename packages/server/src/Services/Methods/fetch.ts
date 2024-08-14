import { NextFunction, Request, Response } from 'express';

import { useFilters, useSorting } from '../../Utils';
import { Model, QueryProps } from '../../Types';
import { serializers } from '../../Serializers';
import { pipelines } from '../../Pipes';
import { schemas } from '../../Schemas';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        serializer = 'list',
        limit = '25',
        sort = 'created_at',
        ...query
      } = req.query as QueryProps;

      const data = await schemas[model]
        .aggregate(pipelines[model])
        .match(useFilters(query))
        .sort(useSorting(sort))
        .project({ ...serializers?.[model]?.[serializer], _id: 0 })
        .limit(Number(limit));

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };
