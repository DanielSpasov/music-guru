import { getDoc, doc } from 'firebase/firestore/lite';
import crypto from 'crypto';

import { Collection } from '../Database/Types';
import db from '../Database';

export default async function generateUID(collectionName: Collection) {
  const uid = crypto.randomBytes(4).toString('hex');
  const reference = doc(db, collectionName, uid);
  const snapshot = await getDoc(reference);
  if (snapshot.exists()) generateUID(collectionName);
  return uid;
}
