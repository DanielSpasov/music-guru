import { BaseDetailedModel, BaseModel } from './Base';
import { Socials } from '../../Validations';
import { ListArtist } from './Artist';

export type Verse = {
  title: string;
  lyrics: string;
  number: number;
};

export type Song = BaseDetailedModel & {
  image: string;
  created_at: Date;
  release_date: Date | null;
  artist: ListArtist;
  features: ListArtist[];
  verses: Verse[];
  links: { name: keyof Socials; url: string }[];
  about: string;
  favorites: number;
};

export type ListSong = BaseModel & {
  image: string;
  artist: ListArtist;
  favorites: number;
};
