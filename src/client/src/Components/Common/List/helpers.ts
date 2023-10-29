import { Config, ModelKeys } from '../../../Api/helpers';
import { Artist } from '../../../Pages/artists/helpers';
import { Album } from '../../../Pages/albums/helpers';
import { Song } from '../../../Pages/songs/helpers';

export type Model = Song | Artist | Album;

export type ListProps = {
  fetchFn: (config?: Config) => Promise<{ data: Model[] }>;
  model: ModelKeys;
  filters?: any[];
  skeletonLength?: number;
};

export type SkeletonProps = {
  model: ModelKeys;
  length?: number;
};
