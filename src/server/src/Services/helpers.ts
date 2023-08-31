import { Model } from 'mongoose';
import { ZodSchema } from 'zod';

export type FetchProps = string;

export type GetProps<T> = {
  Model: Model<T>;
};

export type DelProps<T> = {
  Model: Model<T>;
};

type Relation<T> = {
  key: keyof T;
  relation: string | string[];
};

export type PostProps<T> = {
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  prepopulate?: (keyof T)[];
  relations?: Relation<T>[];
};

export type PatchProps<T> = {
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  prepopulate?: (keyof T)[];
};
