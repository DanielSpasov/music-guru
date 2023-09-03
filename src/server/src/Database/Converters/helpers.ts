import {
  DocumentData,
  DocumentReference,
  doc,
  getDoc
} from 'firebase/firestore/lite';

import { AnyObj, ConvertType } from '../Types';
import db from '../';

async function getRefData(ref: DocumentReference): Promise<Partial<AnyObj>> {
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

export async function getDataByType<T>(
  ct: ConvertType,
  obj: DocumentData,
  key: keyof T & string
) {
  if (ct === 'reference') return obj[key];
  return Array.isArray(obj[key])
    ? await Promise.all(obj[key].map(getRefData))
    : await getRefData(obj[key]);
}
