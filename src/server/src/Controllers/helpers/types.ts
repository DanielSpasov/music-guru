import { ZodSchema } from 'zod';

import { Collection } from '../../Database/types';

export type PostProps<T> = {
  collectionName: Collection;
  validationSchema: ZodSchema;
  references?: Reference<T>[];
  relations?: Relation<T>[];
};

export type PatchProps<T> = {
  collectionName: Collection;
  validationSchema: ZodSchema;
  references?: Reference<T>[];
};

export type Reference<T> = {
  key: keyof T;
  collection: Collection;
};

export type Relation<T> = {
  key: keyof T;
  collection: Collection;
  relationKey: string;
};
