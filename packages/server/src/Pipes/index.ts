import { PipelineStage } from 'mongoose';

import { Model } from '../Types';

import { artistPipelines } from './Artist';
import { albumPipelines } from './Album';
import { songPipelines } from './Song';

export const pipelines: Record<Model, PipelineStage[]> = {
  artists: artistPipelines,
  albums: albumPipelines,
  songs: songPipelines,
  album_types: [],
  users: []
};
