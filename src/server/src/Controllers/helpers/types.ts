import { ZodSchema } from 'zod';

import { Collection } from '../../Database/types';

export type PostProps<T> = {
  collectionName: Collection;
  validationSchema: ZodSchema;
  references?: Referece<T>[];
  relations?: Relation<T>[];
};

export type PatchProps<T> = {
  collectionName: Collection;
  validationSchema: ZodSchema;
  references?: Referece<T>[];
};

export type Referece<T> = {
  key: keyof T;
  collection: Collection;
  type?: 'str' | 'arr';
};

export type Relation<T> = {
  key: keyof T;
  collection: Collection;
  relationKey: string;
};
