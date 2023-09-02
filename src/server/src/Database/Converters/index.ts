import { Collection, ObjConverter } from '../types';

import artistConverter from './Artist';
import albumConverter from './Album';
import songConverter from './Song';
import userConverter from './User';

export const converters: Record<Collection, ObjConverter> = {
  songs: songConverter,
  albums: albumConverter,
  artists: artistConverter,
  users: userConverter
};
