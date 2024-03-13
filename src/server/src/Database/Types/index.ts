import { Artist, DBArtist } from './Artist';
import { Album, DBAlbum } from './Album';
import { Song, DBSong } from './Song';
import { User } from './User';

export { SignInData, SignUpData } from './User';

export type ModelCollection = 'users' | 'artists' | 'songs' | 'albums';
export type TypeCollection = 'album-types';
export type Collection = ModelCollection | TypeCollection;

export type Serializer = 'detailed' | 'list';
export type ObjSerialzier = Record<Serializer, (data: any) => any>;

export type AnyObj = Song | Artist | Album | User;
export type AnyDBObj = DBSong | DBArtist | DBAlbum;

export { Song, Artist, Album, User };
export { DBSong, DBArtist, DBAlbum };
