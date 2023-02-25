import Api from '../../../Api';
import { Artist } from '../../../Pages/artists/helpers';
import { Single } from '../../../Pages/singles/helpers';

export type Model = Single | Artist;
type ModelKeys = Exclude<keyof typeof Api, 'prototype'>;

export type ListProps = {
  data: Model[];
  model: ModelKeys;
};
