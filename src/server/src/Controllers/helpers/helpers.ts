import {
  DocumentReference,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore/lite';

import { Collection, Reference } from '../../Database/Types';
import db from '../../Database';

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

export async function removeRelations<T>(
  refs: Reference<T>[],
  objRef: DocumentReference
) {
  const snapshot = await getDoc(objRef);
  const data = (await snapshot.data()) as T;

  for (const { key, collection, relationKey } of refs) {
    if (!data[key]) continue;

    if (Array.isArray(data[key])) {
      for (const { id } of data[key] as DocumentReference[]) {
        await removeRef(collection, id, relationKey, objRef);
      }
      continue;
    }
    await removeRef(
      collection,
      (data[key] as DocumentReference).id,
      relationKey,
      objRef
    );
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

const removeRef = async (
  collection: Collection,
  id: string,
  key: string,
  ref: DocumentReference
) => {
  const relationRef = doc(db, collection, id);
  if (!relationRef?.id) return;
  await updateDoc(relationRef, { [key]: arrayRemove(ref) });
};
