import { z } from 'zod';

import { BaseSongSchema } from '../Schemas';
import { Artist } from './Artist';
import { User } from './User';

export interface Song extends z.infer<typeof BaseSongSchema> {
  uid: string;
  image: string;
  created_at: Date;
  release_date: Date | null;
  created_by: User;
  artist: Artist;
  features: Artist[];
}

export interface DBSong {
  name: string;
  image: string;
  created_at: Date;
  release_date: Date | null;
  created_by: string;
  artist: string;
  features: string[];
}
