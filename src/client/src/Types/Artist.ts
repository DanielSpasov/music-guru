import { ListAlbum } from '../Types/Album';
import { Song } from '../Types/Song';

export interface Artist {
  name: string;
  about: string;
  image: string;
  uid: string;
  created_at: Date;
  created_by: string;
  albums: ListAlbum[];
  songs: Song[];
  features: Song[];
  favorites: number;
  links: { name: string; url: string }[];
}

export interface ListArtist {
  uid: string;
  name: string;
  image: string;
  favorites: number;
}
