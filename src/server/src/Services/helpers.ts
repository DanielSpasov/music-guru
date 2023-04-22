import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { ZodSchema } from 'zod';

export type FetchProps<T> = {
  req: Request;
  res: Response;
  Model: Model<T>;
};

export type GetProps<T> = {
  req: Request;
  res: Response;
  Model: Model<T>;
};

export type DelProps<T> = {
  req: Request;
  res: Response;
  Model: Model<T>;
};

export type PostProps<T> = {
  req: Request;
  res: Response;
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  preCreateFn?: (props: any) => any;
  postCreateFn?: (props: any) => any;
};

export type PatchProps<T> = {
  req: Request;
  res: Response;
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  preUpdateFn?: (props: any) => any;
  postUpdateFn?: (props: any) => any;
};
