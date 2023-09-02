import { Artist, DBArtist } from './Artist';
import { Album, DBAlbum } from './Album';
import { Song, DBSong } from './Song';
import { User } from './User';

export type AnyObj = Song | Artist | Album | User;
export type AnyDBObj = DBSong | DBArtist | DBAlbum;

export { Song, Artist, Album, User };
export { DBSong, DBArtist, DBAlbum };

export { SignInData, SignUpData } from './User';
