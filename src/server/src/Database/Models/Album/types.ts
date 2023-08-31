import { InferSchemaType } from 'mongoose';

import Schema from './schema';

export type IAlbum = InferSchemaType<typeof Schema>;
