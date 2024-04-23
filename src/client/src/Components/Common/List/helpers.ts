import { Dispatch, SetStateAction } from 'react';

import { Config, ModelKeys } from '../../../Api/helpers';
import { Album } from '../../../Pages/albums/helpers';
import { Song } from '../../../Pages/songs/helpers';
import { Artist } from '../../../Types/Artist';
import { Favorites } from '../../../Contexts';

export type Model = Song | Artist | Album;

export type Filter = {
  key: string;
  label: string;
  placeholder?: string;
};

export type ListProps = {
  fetchFn: (config?: Config) => Promise<{ data: Model[] }>;
  favoriteFn?: (uid: string) => Promise<{ favorites: Favorites }>;
  model: Exclude<ModelKeys, 'user'>;
  filtersConfig?: Filter[];
  skeletonLength?: number;
  center?: boolean;
  emptyMessage?: string;
};

export type FiltersProps = {
  config: Filter[];
  setFilters: Dispatch<SetStateAction<Record<string, any>>>;
  onSubmit: (...props: any) => void;
};

export type SkeletonProps = {
  model: ModelKeys;
  length?: number;
};
