import { PipelineStage } from 'mongoose';

import { artistSerializers } from './Artist';
import { albumSerializers } from './Album';
import { userSerializers } from './User';
import { songSerializers } from './Song';
import { Model } from '../Types';

export const serializers: Partial<
  Record<Model, Record<string, PipelineStage.Project['$project']>>
> = {
  artists: artistSerializers,
  albums: albumSerializers,
  users: userSerializers,
  songs: songSerializers
};
