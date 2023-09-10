import { Collection, Serializer, ObjConverter } from '../Types';

import artistConverter from './Artist';
import albumConverter from './Album';
import songConverter from './Song';
import userConverter from './User';

export const converters: Record<
  Collection,
  (serializer?: Serializer) => ObjConverter
> = {
  songs: (serializer?: Serializer) => songConverter(serializer),
  albums: (serializer?: Serializer) => albumConverter(serializer),
  artists: (serializer?: Serializer) => artistConverter(serializer),
  users: () => userConverter()
};
