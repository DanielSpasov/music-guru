import { Collection, Reference } from './types';

const refs: Record<Collection, Reference<any>[]> = {
  albums: [
    { key: 'artist', collection: 'artists', relationKey: 'albums' },
    { key: 'songs', collection: 'songs', relationKey: 'albums' }
  ],
  artists: [
    { key: 'albums', collection: 'albums', relationKey: 'artist' },
    { key: 'features', collection: 'songs', relationKey: 'features' },
    { key: 'songs', collection: 'songs', relationKey: 'artist' }
  ],
  songs: [
    { key: 'artist', collection: 'artists', relationKey: 'songs' },
    { key: 'features', collection: 'artists', relationKey: 'features' }
  ],
  users: []
};

export const getRefs = <T>(name: Collection): Reference<T>[] => refs[name];
