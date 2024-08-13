import { ListArtist } from './Artist';
import { BaseModel } from './Base';
import { ListSong } from './Song';

export type AlbumType = BaseModel & {
  code: string;
};

export type Album = BaseModel & {
  type: AlbumType;
  image: string;
  created_at: Date;
  created_by: string;
  release_date: string | null;
  artist: ListArtist;
  songs: ListSong[];
  favorites: number;
};

export type ListAlbum = BaseModel & {
  type: AlbumType;
  image: string;
  release_date: string | null;
  favorites: number;
};
