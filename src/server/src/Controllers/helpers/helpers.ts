import {
  ref as storageRef,
  getStorage,
  getDownloadURL
} from 'firebase/storage';
import { QuerySnapshot, WhereFilterOp } from 'firebase/firestore/lite';

import { Collection, Serializer } from '../../Database/Types';
import { serializers } from '../../Database/Serializers';
import { File } from '../../Database/Types/File';

export type QueryProps = {
  serializer?: Serializer;
  [key: string]: any;
};

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

export async function getList(
  snapshot: QuerySnapshot,
  collectionName: Collection,
  serializer: Serializer
) {
  return await Promise.all(
    snapshot.docs.map(async doc => {
      const data = doc.data();
      const serialized = await serializers?.[collectionName]?.[serializer]?.(
        data
      );
      return serialized || data;
    })
  );
}

export function getOp(op: string): WhereFilterOp {
  switch (op) {
    case 'contains':
      return 'array-contains';
    case 'in':
      return op;
    default:
      return '==';
  }
}
