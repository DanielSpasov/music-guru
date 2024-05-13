import { z } from 'zod';

import { ListUser } from '../Serializers/User';
import { BaseSongSchema } from '../Schemas';
import { Artist } from './Artist';
import { User } from './User';

export interface Verse {
  title: string;
  lyrics: string;
  number: number;
}

export interface Song extends z.infer<typeof BaseSongSchema> {
  uid: string;
  image: string;
  created_at: Date;
  release_date: Date | null;
  created_by: User;
  artist: Artist;
  features: Artist[];
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
