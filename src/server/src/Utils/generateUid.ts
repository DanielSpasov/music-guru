import { Model } from 'mongoose';
import crypto from 'crypto';

export default async function generateUID<T>(Model: Model<T>) {
  const uid = crypto.randomBytes(4).toString('hex');
  const usedUid = await Model.findOne({ uid });
  if (!usedUid) return uid;
  generateUID(Model);
}
