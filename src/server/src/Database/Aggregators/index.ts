import { Models } from '../Types';
import { albumAggregators } from './Album';
import { artistAggregators } from './Artist';
import { songAggregators } from './Song';
import { AggregationStage } from './types';

export const aggregators: Record<Models, AggregationStage[]> = {
  albums: albumAggregators,
  artists: artistAggregators,
  songs: songAggregators,
  users: []
};
