import { Config, ModelKeys } from '../../../Api/helpers';
import { Artist } from '../../../Pages/artists/helpers';
import { Album } from '../../../Pages/albums/helpers';
import { Song } from '../../../Pages/songs/helpers';
import { Dispatch, SetStateAction } from 'react';

export type Model = Song | Artist | Album;

export type Filter = {
  key: string;
  label: string;
  placeholder?: string;
};

export type ListProps = {
  fetchFn: (config?: Config) => Promise<{ data: Model[] }>;
  model: ModelKeys;
  filtersConfig?: Filter[];
  skeletonLength?: number;
  center?: boolean;
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
