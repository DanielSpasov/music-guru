import { InferSchemaType, Types } from 'mongoose';

import Schema from './schema';

export type DiscographyTypes = 'features' | 'albums';

export type ISong = InferSchemaType<typeof Schema>;

export type ISongMethods = {
  add: (type: DiscographyTypes, obj_id: Types.ObjectId) => Promise<void>;
  del: (type: DiscographyTypes, obj_id: Types.ObjectId) => Promise<void>;
};
