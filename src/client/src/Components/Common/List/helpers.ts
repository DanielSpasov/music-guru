import Api from '../../../Api';
import { Album } from '../../../Pages/albums/helpers';
import { Artist } from '../../../Pages/artists/helpers';
import { Song } from '../../../Pages/songs/helpers';

export type Model = Song | Artist | Album;
type ModelKeys = Exclude<keyof typeof Api, 'prototype'>;

export type ListProps = {
  data: Model[];
  model: ModelKeys;
  loading?: boolean;
};
