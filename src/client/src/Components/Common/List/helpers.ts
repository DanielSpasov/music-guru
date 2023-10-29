import { ModelKeys } from '../../../Api/helpers';
import { Album } from '../../../Pages/albums/helpers';
import { Artist } from '../../../Pages/artists/helpers';
import { Song } from '../../../Pages/songs/helpers';

export type Model = Song | Artist | Album | undefined;

export type ListProps = {
  data: Model[];
  model: ModelKeys;
  title?: string;
  filters?: any[];
  loading?: boolean;
  skeletonLength?: number;
};

export type SkeletonProps = {
  model: ModelKeys;
  length?: number;
};
