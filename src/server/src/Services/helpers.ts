import { HydratedDocument, Model } from 'mongoose';
import { ZodSchema } from 'zod';

export type FetchProps<T> = {
  Model: Model<T>;
};

export type GetProps<T> = {
  Model: Model<T>;
};

export type DelProps<T> = {
  Model: Model<T>;
};

export type PostProps<T> = {
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  prepopulate?: (keyof T)[];
  postCreateFn?: (data: HydratedDocument<T, object, unknown>) => Promise<void>;
};

export type PatchProps<T> = {
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  preUpdateFn?: (data: T) => Promise<{ data: Partial<T> }>;
  postUpdateFn?: (
    data: HydratedDocument<T, object, unknown>,
    updated?: HydratedDocument<T, object, unknown> | null
  ) => Promise<void>;
};
