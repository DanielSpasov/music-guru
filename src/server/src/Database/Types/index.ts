import { FirestoreDataConverter } from 'firebase/firestore/lite';

import { Artist, DBArtist, UnpopulatedArtist } from './Artist';
import { Album, DBAlbum, UnpopulatedAlbum } from './Album';
import { Song, DBSong, UnpopulatedSong } from './Song';
import { User } from './User';

export { SignInData, SignUpData } from './User';

export type Collection = 'users' | 'artists' | 'songs' | 'albums';

export type Serializer = 'reference' | 'detailed' | 'list';
export type ObjSerialzier = Partial<Record<Serializer, (data: any) => any>>;
export type CollectionSerializer = Partial<Record<Collection, ObjSerialzier>>;

export type Reference<T> = {
  key: keyof T;
  collection: Collection;
  relationKey: string;
};

export type AnyObj = Song | Artist | Album | User;
export type AnyDBObj = DBSong | DBArtist | DBAlbum;
export type AnyUnpopulatedObj =
  | UnpopulatedAlbum
  | UnpopulatedArtist
  | UnpopulatedSong;

export type ObjConverter = FirestoreDataConverter<Partial<AnyObj>, AnyDBObj>;

export { Song, Artist, Album, User };
export { DBSong, DBArtist, DBAlbum };
export { UnpopulatedArtist, UnpopulatedAlbum, UnpopulatedSong };
