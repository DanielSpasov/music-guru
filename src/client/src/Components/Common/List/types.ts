import { Config, ModelKeys } from '../../../Api/helpers';
import { FavoriteFn } from '../../../Hooks/useFavorite';
import { CardModel } from '../Card/helpers';

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
  fetchFn: (config?: Config) => Promise<{ data: T[] }>;
  favoriteFn?: FavoriteFn;
  model: CardModel;
  filtersConfig?: Filter[];
  skeletonLength?: number;
};

export type SkeletonProps = {
  model: ModelKeys;
  length?: number;
};
