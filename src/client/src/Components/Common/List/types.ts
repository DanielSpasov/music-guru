import { AxiosRequestConfig } from 'axios';

import { FavoriteFn } from '../../../Hooks/useFavorite';
import { CardModel } from '../Card/helpers';
import { Model } from '../../../Api/types';

export type BaseModel = { uid: string };

export type ListState<T> = {
  items: T[];
  favs: string[];
};

export type Filter = {
  key: string;
  label: string;
  placeholder?: string;
};

export type ListProps<T> = {
  fetchFn: (config?: AxiosRequestConfig) => Promise<{ data: T[] }>;
  favoriteFn?: FavoriteFn;
  model: CardModel;
  filtersConfig?: Filter[];
  skeletonLength?: number;
};

export type SkeletonProps = {
  model: Model;
  length?: number;
};
