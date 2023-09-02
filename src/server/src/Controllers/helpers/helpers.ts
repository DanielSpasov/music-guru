import {
  DocumentReference,
  DocumentSnapshot,
  arrayUnion,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore/lite';

import { Collection, Reference } from '../../Database/types';
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

export async function createReferences<T>(refs: Reference<T>[], data: T) {
  return refs.reduce((obj, { key, collection }) => {
    if (!data[key]) return obj;

    if (Array.isArray(data[key])) {
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

export async function createRelations<T>(
  rels: Reference<T>[],
  data: T,
  objRef: DocumentReference
) {
  for (const { key, collection, relationKey } of rels) {
    if (!data[key]) continue;

    if (Array.isArray(data[key])) {
      for (const id of data[key] as string[]) {
        await attachRef(collection, id, relationKey, objRef);
      }
      continue;
    }

    await attachRef(collection, data[key] as string, relationKey, objRef);
  }
}

const attachRef = async (
  collection: Collection,
  id: string,
  key: string,
  ref: DocumentReference
) => {
  const relationRef = doc(db, collection, id);
  if (!relationRef?.id) return;
  await updateDoc(relationRef, { [key]: arrayUnion(ref) });
};
