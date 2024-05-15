import { Request, Response } from 'express';

import { Models, Serializer } from '../Database/Types';
import { serializers } from '../Database/Serializers';

export type QueryProps = { serializer?: Serializer };

export const serialize = ({ req, res }: { req: Request; res: Response }) => {
  const { serializer = 'list' }: QueryProps = req.query;
  const collection = res.locals.collection as Models;
  return serializers[collection][serializer](res.locals.item);
};
