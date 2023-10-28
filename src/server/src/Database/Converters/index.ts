import { Collection, ObjConverter } from '../Types';

import artistConverter from './artist';
import albumConverter from './album';
import songConverter from './song';
import userConverter from './user';

export const converters: Record<Collection, ObjConverter> = {
  songs: songConverter,
  albums: albumConverter,
  artists: artistConverter,
  users: userConverter
};
