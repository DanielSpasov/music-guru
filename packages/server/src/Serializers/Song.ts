import { artistSerializers } from './Artist';

export const songSerializers = {
  list: {
    uid: 1,
    name: 1,
    image: 1,
    artist: artistSerializers.list,
    favorites: 1
  },
  detailed: {
    uid: 1,
    name: 1,
    image: 1,
    about: 1,
    created_at: 1,
    created_by: 1,
    release_date: 1,
    artist: artistSerializers.list,
    features: artistSerializers.list,
    verses: 1,
    links: 1,
    editors: 1,
    favorites: 1
  }
};
