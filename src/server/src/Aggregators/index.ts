import { AggregationStage } from './types';
import { Model } from '../Types';

import { artistAggregators } from './Artist';
import { albumAggregators } from './Album';
import { songAggregators } from './Song';

export const aggregators: Record<Model, AggregationStage[]> = {
  albums: albumAggregators,
  artists: artistAggregators.detailed,
  songs: songAggregators,
  album_types: [],
  users: []
};
