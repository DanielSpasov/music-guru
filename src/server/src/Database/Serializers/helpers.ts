import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore/lite';

import { Collection, Serializer as ISerializer } from '../Types';

import { converters } from '../Converters';
import { serializers } from '.';
import db from '../';

export class Serializer {
  async populate(
    key: keyof Omit<this, 'populate'>,
    collectionName: Collection,
    serializer: ISerializer,
    keys?: string[]
  ) {
    if (!Array.isArray(this[key])) {
      const reference = doc(
        db,
        collectionName,
        this[key] as string
      ).withConverter(converters[collectionName]);
      const snapshot = await getDoc(reference);
      const data = snapshot.data();
      const serialized = await serializers?.[collectionName]?.[serializer]?.(
        data
      );
      const custom = keys?.reduce(
        (obj, key) => ({ ...obj, [key]: serialized?.[key] }),
        {}
      );
      this[key] = custom || serialized || data;
      return;
    }

    if (!(this[key] as Array<string>).length) return;

    const q = query(
      collection(db, collectionName),
      where(documentId(), 'in', this[key])
    ).withConverter(converters[collectionName]);
    const querySnap = await getDocs(q);
    // @ts-expect-error: We want to be able to overwrite properties
    this[key] = await Promise.all(
      querySnap.docs.map(x => {
        const data = x.data();
        const serialized = serializers?.[collectionName]?.[serializer]?.(data);
        const custom = keys?.reduce(
          (obj, key) => ({ ...obj, [key]: serialized[key] }),
          {}
        );
        return custom || serialized || data;
      })
    );
  }
}
