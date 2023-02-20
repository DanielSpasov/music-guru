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
  preCreateFn?: (doc: any) => Promise<{ data: any }>;
  postCreateFn?: (doc: any) => Promise<void>;
};
