import { Collection, ConvertType, ObjConverter } from '../Types';

import artistConverter from './Artist';
import albumConverter from './Album';
import songConverter from './Song';
import userConverter from './User';

export const converters: Record<Collection, (ct: ConvertType) => ObjConverter> =
  {
    songs: (ct: ConvertType) => songConverter(ct),
    albums: (ct: ConvertType) => albumConverter(ct),
    artists: (ct: ConvertType) => artistConverter(ct),
    users: () => userConverter()
  };
