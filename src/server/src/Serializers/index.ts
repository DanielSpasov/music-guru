import { Model, Serializer } from '../Types';
import { PipelineStage } from 'mongoose';

import { serializers as artists } from './Artist';
import { serializers as albums } from './Album';
import { serializers as users } from './User';
import { serializers as songs } from './Song';

export const serializers: Partial<
  Record<Model, Record<Serializer, PipelineStage.Project['$project']>>
> = {
  artists,
  albums,
  users,
  songs
};
