import { NextFunction, Request, Response } from 'express';

import { Model, QueryProps } from '../../Types';
import { aggregators } from '../../Aggregators';
import { serializers } from '../../Serializers';
import { schemas } from '../../Schemas';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { serializer = 'detailed' } = req.query as QueryProps;

      const [data] = await schemas[model]
        .aggregate(aggregators[model])
        .match({ uid: req.params.id })
        .project({
          ...serializers?.[model]?.[serializer],
          _id: 0
        });

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };
