import { Collection, ObjConverter } from '../types';

import artistConverter from './artist';
import albumConverter from './album';
import songConverter from './song';
import userConverter from './user';

const converters: Record<Collection, ObjConverter> = {
  songs: songConverter,
  albums: albumConverter,
  artists: artistConverter,
  users: userConverter
};

export default converters;
