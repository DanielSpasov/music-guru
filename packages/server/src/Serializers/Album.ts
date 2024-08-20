import { artistSerializers } from './Artist';
import { songSerializers } from './Song';

const typeSerializer = { uid: 1, name: 1, code: 1 };

export const albumSerializers = {
  list: {
    uid: 1,
    name: 1,
    type: typeSerializer,
    image: 1,
    favorites: 1,
    release_date: 1
  },
  detailed: {
    uid: 1,
    name: 1,
    type: typeSerializer,
    artist: artistSerializers.list,
    image: 1,
    favorites: 1,
    release_date: 1,
    created_at: 1,
    created_by: 1,
    editors: 1,
    songs: songSerializers.list
  }
};
