import { NextFunction, Request, Response } from 'express';

import { schemas } from '../Schemas';
import { APIError } from '../Error';
import { Model } from '../Types';

const get =
  ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [item] = await schemas[model]
        .aggregate()
        .match({ uid: req.params.id })
        .project({ _id: 0 });

      if (!item) throw new APIError(404, 'Item not found.');

      res.locals.item = item;

      next();
    } catch (err) {
      next(err);
    }
  };

export default get;
