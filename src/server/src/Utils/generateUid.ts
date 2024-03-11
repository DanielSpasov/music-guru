import crypto from 'crypto';

import { Collection } from '../Database/Types';
import { connect } from '../Database';

export default async function generateUID(collectionName: Collection) {
  const uid = crypto.randomBytes(4).toString('hex');
  const db = await connect();
  const collection = db.collection(collectionName);
  const isUsed = await collection.findOne({ uid });
  if (isUsed) generateUID(collectionName);
  return uid;
}
