import { Document, Types } from 'mongoose';

export const defaultTransform = (_: unknown, data: Document<unknown>) => {
  delete data._id;
  delete data.__v;
  return data;
};

export async function add<T, K extends keyof T>(
  this: T & Record<K, Types.ObjectId[]> & Record<'save', () => Promise<T>>,
  key: K,
  id: Types.ObjectId
) {
  if (this[key].includes(id)) return;
  this[key].push(id);
  await this.save();
}

export async function del<T, K extends keyof T>(
  this: T & Record<K, Types.ObjectId[]> & Record<'save', () => Promise<T>>,
  key: K,
  id: Types.ObjectId
) {
  if (!this[key].includes(id)) return;
  const itemIndex = this[key].indexOf(id);
  this[key].splice(itemIndex, 1);
  await this.save();
}
