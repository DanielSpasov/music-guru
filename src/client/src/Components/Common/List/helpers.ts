import { Dispatch, SetStateAction } from 'react';

import { Config, ModelKeys } from '../../../Api/helpers';
import { ListArtist } from '../../../Types/Artist';
import { ListAlbum } from '../../../Types/Album';
import { ListSong } from '../../../Types/Song';
import { Favorites } from '../../../Contexts';

export type Model = ListSong | ListArtist | ListAlbum;

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
