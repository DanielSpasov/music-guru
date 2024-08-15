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
        page = '1',
        ...query
      } = req.query as QueryProps;

      const filters = useFilters(query);
      const sorting = useSorting(sort);

      const [totalItems, data] = await Promise.all([
        schemas[model].countDocuments(filters),
        schemas[model]
          .aggregate(pipelines[model])
          .match(filters)
          .sort(sorting)
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .project({ ...serializers?.[model]?.[serializer], _id: 0 })
      ]);

      res.status(200).json({
        data,
        pagination: {
          totalItems,
          totalPages: Math.ceil(totalItems / Number(limit)),
          currentPage: Number(page)
        }
      });
    } catch (err) {
      next(err);
    }
  };
