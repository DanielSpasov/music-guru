import { Artist, DBArtist } from './Artist';
import { Album, DBAlbum } from './Album';
import { Song, DBSong } from './Song';
import { User, DBUser } from './User';

export { SignInData, SignUpData } from './User';

export type Databases = 'models';

export type Models = 'users' | 'artists' | 'songs' | 'albums' | 'album_types';

export type Serializer = 'detailed' | 'list';
export type ObjSerialzier = Record<Serializer, (data: any) => any>;

export { Song, Artist, Album, User };
export { DBSong, DBArtist, DBAlbum, DBUser };
