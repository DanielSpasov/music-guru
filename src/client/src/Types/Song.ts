import { ListArtist } from './Artist';
import { ListUser } from './User';

export type Verse = {
  title: string;
  lyrics: string;
  number: number;
};

export interface Song {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  created_by: string;
  release_date: Date | null;
  artist: ListArtist;
  features: ListArtist[];
  verses: Verse[];
  links: { name: string; url: string }[];
  about: string;
  editors: ListUser[];
}

export interface ListSong {
  uid: string;
  name: string;
  image: string;
  artist: string;
}
