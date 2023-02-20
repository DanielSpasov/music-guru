import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { ZodSchema } from 'zod';

export type PostProps<T> = {
  req: Request;
  res: Response;
  Model: Model<T>;
  ValidationSchema: ZodSchema;
  preCreateFn?: (doc: any) => Promise<{ data: any }>;
  postCreateFn?: (doc: any) => Promise<void>;
};
