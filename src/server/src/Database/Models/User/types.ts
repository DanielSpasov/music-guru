import { InferSchemaType } from 'mongoose';

import Schema from './schema';

export type IUser = InferSchemaType<typeof Schema>;
