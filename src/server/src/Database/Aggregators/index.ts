import { ModelCollection } from '../Types';
import { albumAggregators } from './Album';
import { artistAggregators } from './Artist';
import { songAggregators } from './Song';

export const aggregators: Record<ModelCollection, any[]> = {
  albums: albumAggregators,
  artists: artistAggregators,
  songs: songAggregators,
  users: []
};
