import { BaseDBModel } from './Base';
import { DBArtist } from './Artist';
import { DBUser } from './User';

export type Verse = {
  title: string;
  lyrics: string;
  number: number;
};

export type DBSong = BaseDBModel & {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  release_date: Date | null;
  created_by: DBUser;
  artist: DBArtist;
  features: DBArtist[];
  verses: Verse[];
  links: { name: string; url: string }[];
  about: string;
  editors: DBUser[];
  favorites: number;
};
