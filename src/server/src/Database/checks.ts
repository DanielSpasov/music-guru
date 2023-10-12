import {
  DocumentSnapshot,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore/lite';

import { converters } from './Converters';
import { Collection } from './Types';
import db from '../Database';

type Check = Record<
  'del',
  (snap: DocumentSnapshot) => Promise<boolean | string>
>;

export const checks: Partial<Record<Collection, Check>> = {
  songs: {
    del: async (snap: DocumentSnapshot) => {
      const list = await getDocs(
        query(
          collection(db, 'albums').withConverter(converters.albums),
          where('songs', 'array-contains', snap.id)
        )
      );

      if (list.docs.length) {
        return 'Remove song from all related Albums before deleting it.';
      }

      return false;
    }
  }
};
