import { Socials } from '../../Validations';
import { ListArtist } from './Artist';
import { BaseModel } from './Base';
import { ListUser } from './User';

export type Verse = {
  title: string;
  lyrics: string;
  number: number;
};

export type Song = BaseModel & {
  image: string;
  created_at: Date;
  created_by: string;
  release_date: Date | null;
  artist: ListArtist;
  features: ListArtist[];
  verses: Verse[];
  links: { name: keyof Socials; url: string }[];
  about: string;
  editors: ListUser[];
  favorites: number;
};

export type ListSong = BaseModel & {
  image: string;
  artist: ListArtist;
  favorites: number;
};
