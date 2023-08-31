import { InferSchemaType, Types } from 'mongoose';

import Schema from './schema';

export type DiscographyTypes = 'songs' | 'features' | 'albums' | 'mixtapes';

export type IArtist = InferSchemaType<typeof Schema>;

export type IArtistMethods = {
  add: (type: DiscographyTypes, song_id: Types.ObjectId) => Promise<void>;
  del: (type: DiscographyTypes, song_id: Types.ObjectId) => Promise<void>;
};
