import { Request, Response } from 'express';

import { Models, Serializer } from '../Database/Types';
import { serializers } from '../Database/Serializers';

export type QueryProps = { serializer?: Serializer };

export const serialize = ({ req, res }: { req: Request; res: Response }) => {
  const { serializer = 'list' }: QueryProps = req.query;
  const collection = res.locals.collection as Models;
  return serializers[collection][serializer](res.locals.item);
};

export const useFilters = (query: { [key: string]: string | undefined }) => {
  return Object.entries(query).map(([name, value]) => {
    const isBool = value === 'true' || value === 'false';
    return {
      $match: {
        [name]: isBool
          ? { $eq: value === 'true' }
          : { $regex: value, $options: 'i' }
      }
    };
  });
};
