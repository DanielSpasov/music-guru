import { Model, Serializer } from '../Types';
import { PipelineStage } from 'mongoose';

import { artistSerializers } from './Artist';
import { albumSerializers } from './Album';
import { userSerializers } from './User';
import { songSerializers } from './Song';

export const serializers: Partial<
  Record<Model, Record<Serializer, PipelineStage.Project['$project']>>
> = {
  artists: artistSerializers,
  albums: albumSerializers,
  users: userSerializers,
  songs: songSerializers
};
