import { Collection, Reference } from './Types';

const refs: Record<Collection, Reference<any>[]> = {
  albums: [],
  artists: [],
  songs: [],
  users: []
};

export const getRefs = <T>(name: Collection): Reference<T>[] => refs[name];
