import { Document } from 'mongoose';

import { Artist } from './Artist';
import { BaseModel } from './Base';

export type Verse = {
  title: string;
  lyrics: string;
  number: number;
};

export type Song = Document &
  BaseModel & {
    about: string;
    artist: Artist;
    features: Artist[];
    verses: Verse[];
    links: { name: string; url: string }[];
    release_date: Date | null;
  };
