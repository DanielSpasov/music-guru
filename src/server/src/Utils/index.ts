import { Model, Serializer } from '../Types';
import { serializers } from '../Serializers';
import { BaseDBModel } from '../Types/Base';
import { Sort } from 'mongodb';

export type QueryProps = {
  serializer?: Serializer;
} & Record<string, string>;

export const useSerializer = <T extends BaseDBModel>(
  serializer: Serializer,
  collection: Model,
  item: T
) => {
  return serializers[collection][serializer](item);
};

export const useFilters = (query: QueryProps) => {
  console.log(Object.entries(query).length);
  return Object.entries(query).reduce((filters, [name, value]) => {
    const isBool = value === 'true' || value === 'false';
    const isNegation = name.startsWith('-');
    const fieldName = isNegation ? name.substring(1) : name;

    if (isBool) {
      return {
        ...filters,
        [fieldName]: { [isNegation ? '$ne' : '$eq']: value === 'true' }
      };
    }

    return {
      ...filters,
      [fieldName]: isNegation
        ? { $not: { $regex: value, $options: 'i' } }
        : { $regex: value, $options: 'i' }
    };
  }, {});
};

export const useSorting = (sort: string): Sort => {
  const isNegation = sort.startsWith('-');
  const fieldName = isNegation ? sort.substring(1) : sort;
  return { [fieldName]: isNegation ? 1 : -1 };
};
