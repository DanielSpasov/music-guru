import { serializers as artist } from './Artist';

export const serializers = {
  list: {
    uid: 1,
    name: 1,
    image: 1,
    artist: artist.list,
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
    artist: artist.list,
    features: artist.list,
    verses: 1,
    links: 1,
    editors: 1,
    favorites: 1
  }
};
