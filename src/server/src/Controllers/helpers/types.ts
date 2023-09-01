import { Model } from 'mongoose';
import { ZodSchema } from 'zod';

import { Collection } from '../../Database/types';

export type PostProps<T> = {
  collectionName: Collection;
  validationSchema: ZodSchema;
  refereces?: Referece<T>[];
};

export type Referece<T> = {
  key: keyof T;
  collection: Collection;
  type?: 'str' | 'arr';
};

// Deprecated
export type PatchProps<T> = {
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  prepopulate?: (keyof T)[];
};
