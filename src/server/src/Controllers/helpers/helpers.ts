import {
  DocumentData,
  DocumentReference,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc
} from 'firebase/firestore/lite';
import {
  ref as storageRef,
  getStorage,
  getDownloadURL
} from 'firebase/storage';

import { Collection, Reference } from '../../Database/Types';
import { File } from '../../Database/Types/File';
import db from '../../Database';

export async function getUploadLinks(
  files: File[],
  collectionName: Collection,
  uid: string
) {
  return await files?.reduce(async (uploads, file: File) => {
    const key = file.fieldname.split('[]')[0];
    const name = file.originalname;
    const fileExt = name.split('.')[name.split('.').length - 1];
    const imageRef = storageRef(
      getStorage(),
      `images/${collectionName}/${uid}.${fileExt}`
    );
    return { ...uploads, [key]: await getDownloadURL(imageRef) };
  }, {});
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

export async function updateRelations<T>(
  refs: Reference<T>[],
  data: T,
  oldData: DocumentData,
  reference: DocumentReference
) {
  for (const { key, collection, relationKey } of refs) {
    const _key = key as string;
    if (!data[key]) continue;

    if (Array.isArray(data[key]) && Array.isArray(oldData[_key])) {
      const newFeatures = new Set<string>(data[key] as string[]);
      const oldFeatures = new Set<string>(oldData[_key] as string[]);

      const added = Array.from(newFeatures).filter(x => !oldFeatures.has(x));
      const removed = Array.from(oldFeatures).filter(x => !newFeatures.has(x));

      const mapFn = (action: keyof RefActions) => (x: string) => {
        ref(collection, x, relationKey)[action](reference);
      };

      await Promise.all(added.map(mapFn('attach')));
      await Promise.all(removed.map(mapFn('remove')));

      continue;
    }

    if (data[key] === oldData[_key]) continue;
    await ref(collection, oldData[_key], relationKey).remove(reference);
    await ref(collection, data[key] as string, relationKey).attach(reference);
  }
}

type RefActions = {
  attach: (ref: DocumentReference) => Promise<void>;
  remove: (ref: DocumentReference) => Promise<void>;
};

const ref = (collection: Collection, id: string, key: string): RefActions => {
  const relationRef = doc(db, collection, id);
  return {
    attach: async (ref: DocumentReference) =>
      await updateDoc(relationRef, { [key]: arrayUnion(ref) }),
    remove: async (ref: DocumentReference) =>
      await updateDoc(relationRef, { [key]: arrayRemove(ref) })
  };
};
