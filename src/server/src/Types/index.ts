import { User } from './User';
import { Song, DBSong } from './Song';
import { Artist, DBArtist } from './Artist';
import { Album, DBAlbum } from './Album';

export type AnyObj = Song | Artist | Album | User;
export type AnyDBObj = DBSong | DBArtist | DBAlbum;

export { Song, Artist, Album, User };
export { DBSong, DBArtist, DBAlbum };
