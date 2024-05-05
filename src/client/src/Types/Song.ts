import { Artist } from './Artist';

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
  artist: Artist;
  features: Artist[];
  verses: Verse[];
}

export interface ListSong {
  uid: string;
  name: string;
  image: string;
  artist: string;
}
