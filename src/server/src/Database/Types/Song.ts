import { ListArtist } from '../Serializers/Artist';
import { ListUser } from '../Serializers/User';

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
  artist: ListArtist;
  features: ListArtist[];
  verses: Verse[];
  links: { name: string; url: string }[];
  about: string;
  editors: ListUser[];
}

export interface DBSong {
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
}
