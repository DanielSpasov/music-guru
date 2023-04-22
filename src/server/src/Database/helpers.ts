import { Document } from 'mongoose';

export const defaultTransform = (_: unknown, data: Document<unknown>) => {
  delete data._id;
  delete data.__v;
  return data;
};
