import { ListArtist } from './Artist';
import { ListSong } from './Song';

export type AlbumType = {
  code: string;
  name: string;
};

export interface Album {
  uid: string;
  name: string;
  type: AlbumType;
  image: string;
  created_at: Date;
  created_by: string;
  release_date: Date | null;
  artist: ListArtist;
  songs: ListSong[];
  favorites: number;
}

export interface ListAlbum {
  uid: string;
  name: string;
  type: AlbumType;
  image: string;
  release_date: Date | null;
  favorites: number;
}
