import { FirestoreDataConverter } from 'firebase/firestore/lite';

import { Artist, DBArtist } from './Artist';
import { Album, DBAlbum } from './Album';
import { Song, DBSong } from './Song';
import { User } from './User';

export { SignInData, SignUpData } from './User';

export type Collection = 'users' | 'artists' | 'songs' | 'albums';

export type Serializer = 'reference' | 'detailed' | 'list';

export type Reference<T> = {
  key: keyof T;
  collection: Collection;
  relationKey: string;
};

export type AnyObj = Song | Artist | Album | User;
export type AnyDBObj = DBSong | DBArtist | DBAlbum;

export type ObjConverter = FirestoreDataConverter<Partial<AnyObj>, AnyDBObj>;

export { Song, Artist, Album, User };
export { DBSong, DBArtist, DBAlbum };
