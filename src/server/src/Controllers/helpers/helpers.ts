import {
  DocumentReference,
  DocumentSnapshot,
  doc,
  getDoc
} from 'firebase/firestore/lite';

import { Referece } from './types';
import db from '../../Database';

async function getRefData(ref: DocumentReference) {
  if (!ref?.id) return;
  const [collection] = ref.path.split('/');
  const document = await getDoc(doc(db, collection, ref.id));
  if (!document.exists()) return;
  return {
    uid: ref.id,
    name: document.data()?.name,
    image: document.data()?.image
  };
}

export async function populateFields(
  query: string | undefined,
  snap: DocumentSnapshot
) {
  const fields = query?.split(',') || [];

  return await fields.reduce(async (obj: Promise<object>, field: string) => {
    const fieldRef = snap.get(field);
    const value = Array.isArray(fieldRef)
      ? await Promise.all(fieldRef.map(getRefData))
      : await getRefData(fieldRef);
    return { ...(await obj), [field]: value };
  }, Promise.resolve({}));
}

export async function createReferences<T>(refs: Referece<T>[], data: T) {
  return refs.reduce((obj, { key, collection, type = 'str' }) => {
    if (type === 'arr') {
      return {
        ...obj,
        [key]: (data[key] as Array<string>)?.map(id => {
          const ref = doc(db, collection, id);
          if (ref?.id) return ref;
        })
      };
    }

    const ref = doc(db, collection, data[key] as string);
    if (!ref?.id) return obj;
    return { ...obj, [key]: ref };
  }, {});
}
