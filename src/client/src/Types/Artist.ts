import { Album } from '../Pages/albums/helpers';
import { Song } from '../Pages/songs/helpers';

export interface Artist {
  name: string;
  about: string;
  image: string;
  uid: string;
  created_at: Date;
  created_by: string;
  albums: Album[];
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
