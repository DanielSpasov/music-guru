import { Model } from 'mongoose';
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
  preCreateFn?: (doc: any) => any;
  postCreateFn?: (doc: any) => any;
};

export type PatchProps<T> = {
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  preUpdateFn?: (doc: any) => any;
  postUpdateFn?: (doc1: any, doc2: any) => any;
};
