import { PipelineStage } from 'mongoose';

import { Model } from '../Types';

import { aggregators as artists } from './Artist';
import { aggregators as albums } from './Album';
import { aggregators as songs } from './Song';

export const aggregators: Record<Model, PipelineStage[]> = {
  artists,
  albums,
  songs,
  album_types: [],
  users: []
};
