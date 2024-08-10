import { ListArtist } from '../Serializers/Artist';
import { ListUser } from '../Serializers/User';
import { Artist } from './Artist';

export interface Verse {
  title: string;
  lyrics: string;
  number: number;
}

export interface Song {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  release_date: Date | null;
  created_by: ListUser;
  artist: Artist;
  features: ListArtist[];
  verses: Verse[];
  links: { name: string; url: string }[];
  about: string;
  editors: ListUser[];
  favorites: number;
}

export interface DBSong {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  release_date: Date | null;
  created_by: string;
  artist: string;
  features: string[];
  verses: Verse[];
  links: { name: string; url: string }[];
  about: string;
  editors: string[];
  favorites: number;
}
