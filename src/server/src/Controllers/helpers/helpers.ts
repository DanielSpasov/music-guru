import {
  ref as storageRef,
  getStorage,
  getDownloadURL
} from 'firebase/storage';

import { ModelCollection, Serializer } from '../../Database/Types';
import { serializers } from '../../Database/Serializers';
import { File } from '../../Database/Types/File';

export type QueryProps = {
  serializer?: Serializer;
  [key: string]: any;
};

export async function getUploadLinks(
  files: File[],
  collectionName: ModelCollection,
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

export function serializeObj<T>(
  data: T,
  collecitonName: string,
  serializerName: string
) {
  const collection = collecitonName as ModelCollection;
  const serializer = serializerName as Serializer;

  const serializerFn = serializers[collection][serializer];
  if (!serializerFn) return data;
  return serializerFn(data);
}
