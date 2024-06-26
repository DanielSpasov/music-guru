import { Artist, DBArtist } from './Artist';
import { Album, DBAlbum } from './Album';
import { Song, DBSong } from './Song';
import { User } from './User';

export { SignInData, SignUpData } from './User';

export type Databases = 'models' | 'types';

export type Models = 'users' | 'artists' | 'songs' | 'albums';
export type Types = 'albums';

export type Serializer = 'detailed' | 'list';
export type ObjSerialzier = Record<Serializer, (data: any) => any>;

export { Song, Artist, Album, User };
export { DBSong, DBArtist, DBAlbum };
