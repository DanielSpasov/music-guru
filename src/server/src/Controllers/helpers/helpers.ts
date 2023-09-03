import {
  DocumentReference,
  arrayUnion,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore/lite';

import { AnyObj, Collection, Reference } from '../../Database/Types';
import db from '../../Database';

export async function getRefData(
  ref: DocumentReference
): Promise<Partial<AnyObj>> {
  if (!ref?.id) return {};
  const [collection] = ref.path.split('/');
  const document = await getDoc(doc(db, collection, ref.id));
  if (!document.exists()) return {};

  return {
    ...(ref?.id ? { uid: ref.id } : {}),
    ...(document.data()?.name ? { name: document.data()?.name } : {}),
    ...(document.data()?.image ? { image: document.data()?.image } : {})
  };
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
