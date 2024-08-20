import { BaseDetailedModel, BaseModel } from './Base';
import { ListArtist } from './Artist';
import { ListSong } from './Song';

export type AlbumType = BaseModel & {
  code: string;
};

export type Album = BaseDetailedModel & {
  type: AlbumType;
  image: string;
  created_at: Date;
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
