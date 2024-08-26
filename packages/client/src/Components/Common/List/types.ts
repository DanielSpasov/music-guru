import { AxiosRequestConfig } from 'axios';

import { Pagination } from '../../../Api/crud/types';
import { Model } from '../../../Api/types';
import { CardModel } from '../Card/types';

export type ListState<T> = {
  items: T[];
  favs: string[];
};

export type Sorting = {
  key: string;
  label: string;
};

export type ListProps<T> = {
  fetchFn: (
    config?: AxiosRequestConfig
  ) => Promise<{ data: T[]; pagination: Pagination }>;
  model: CardModel;
  skeletonLength?: number;
  // Sorting props
  sortingConfig?: Sorting[];
  // Search Props
  searchKey?: string;
  hideSearch?: boolean;
  searchPlaceholder?: string;
};

export type SkeletonProps = {
  model: Model;
  length?: number;
};
