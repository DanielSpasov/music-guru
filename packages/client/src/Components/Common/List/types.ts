import { AxiosRequestConfig } from 'axios';

import { FavoriteFn } from '../../../Hooks/useFavorite/types';
import { Pagination } from '../../../Api/crud/types';
import { Model } from '../../../Api/types';
import { CardModel } from '../Card/types';

export type ListState<T> = {
  items: T[];
  favs: string[];
};

export type Filter = {
  key: string;
  label: string;
  placeholder?: string;
};
export type Sorting = {
  key: string;
  label: string;
};

export type ListProps<T> = {
  fetchFn: (
    config?: AxiosRequestConfig
  ) => Promise<{ data: T[]; pagination: Pagination }>;
  favoriteFn?: FavoriteFn;
  model: CardModel;
  filtersConfig?: Filter[];
  sortingConfig?: Sorting[];
  skeletonLength?: number;
};

export type SkeletonProps = {
  model: Model;
  length?: number;
};
