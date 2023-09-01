import { Model } from 'mongoose';
import { ZodSchema } from 'zod';

export type Collection = 'users' | 'artists' | 'songs' | 'albums';

export type PostProps<T> = {
  collectionName: string;
  validationSchema: ZodSchema;
  defaultData?: Partial<T>;
  refereces?: Referece<T>[];
};

export type Referece<T> = {
  key: keyof T;
  collection: string;
  type?: 'str' | 'arr';
};

// Deprecated
export type PatchProps<T> = {
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  prepopulate?: (keyof T)[];
};
