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
  reference: DocumentReference
) {
  for (const { key, collection, relationKey } of rels) {
    if (!data[key]) continue;

    if (Array.isArray(data[key])) {
      for (const id of data[key] as string[]) {
        await ref(collection, id, relationKey).attach(reference);
      }
      continue;
    }

    await ref(collection, data[key] as string, relationKey).attach(reference);
  }
}

export async function removeRelations<T>(
  refs: Reference<T>[],
  reference: DocumentReference
) {
  const snapshot = await getDoc(reference);
  const data = (await snapshot.data()) as T;

  for (const { key, collection, relationKey } of refs) {
    if (!data[key]) continue;

    if (Array.isArray(data[key])) {
      for (const { id } of data[key] as DocumentReference[]) {
        await ref(collection, id, relationKey).remove(reference);
      }
      continue;
    }
    const id = (data[key] as DocumentReference)?.id;
    await ref(collection, id, relationKey).remove(reference);
  }
}

const ref = (
  collection: Collection,
  id: string,
  key: string
): {
  attach: (ref: DocumentReference) => Promise<void>;
  remove: (ref: DocumentReference) => Promise<void>;
} => {
  const relationRef = doc(db, collection, id);
  return {
    attach: async (ref: DocumentReference) =>
      await updateDoc(relationRef, { [key]: arrayUnion(ref) }),
    remove: async (ref: DocumentReference) =>
      await updateDoc(relationRef, { [key]: arrayRemove(ref) })
  };
};
