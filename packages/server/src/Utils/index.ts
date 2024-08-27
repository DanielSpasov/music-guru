import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { SortOrder } from 'mongoose';

import { File, Model, QueryProps } from '../Types';

export async function getUploadLink(
  file: File,
  collectionName: Model,
  uid: string
) {
  if (!file) return '';
  const name = file.originalname;
  const fileExt = name.split('.')[name.split('.').length - 1];
  const imageRef = ref(
    getStorage(),
    `images/${collectionName}/${uid}.${fileExt}`
  );
  return await getDownloadURL(imageRef);
}

const handleSingleFilter = (name: string, value: string) => {
  const isNegation = name.startsWith('-');
  const fieldName = isNegation ? name.substring(1) : name;

  const isBool = value === 'true' || value === 'false';
  if (isBool) {
    return {
      [fieldName]: { [isNegation ? '$ne' : '$eq']: value === 'true' }
    };
  }

  return {
    [fieldName]: isNegation
      ? { $not: { $regex: value, $options: 'i' } }
      : { $regex: value, $options: 'i' }
  };
};

export const useFilters = (query: QueryProps) => {
  const _query = Object.entries(query);

  if (!_query.length) return {};

  if (_query.length === 1) {
    return { ...handleSingleFilter(_query[0][0], _query[0][1]) };
  }

  return {
    $and: [..._query.map(([name, value]) => handleSingleFilter(name, value))]
  };
};

export const useSorting = (sort: string): Record<string, SortOrder> => {
  const isNegation = sort.startsWith('-');
  const fieldName = isNegation ? sort.substring(1) : sort;
  return { [fieldName]: isNegation ? 1 : -1, name: 1 };
};
