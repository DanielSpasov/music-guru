import { AlbumType } from './AlbumType';
import { BaseDBModel } from './Base';
import { DBArtist } from './Artist';
import { DBSong } from './Song';
import { DBUser } from './User';

export type DBAlbum = BaseDBModel & {
  uid: string;
  name: string;
  image: string;
  type: AlbumType;
  created_by: DBUser;
  artist: DBArtist;
  songs: DBSong[];
  release_date: Date | null;
  created_at: Date;
  favorites: number;
};
