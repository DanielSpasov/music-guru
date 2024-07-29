import { z } from 'zod';

import { ArtistSchema } from '../Schemas';
import { User } from './User';

export interface Artist extends z.infer<typeof ArtistSchema> {
  uid: string;
  image: string;
  bio: string;
  created_at: Date;
  created_by: User;
}

export interface DBArtist {
  name: string;
  image: string;
  bio: string;
  created_at: Date;
  created_by: string;
  favorites: number;
}
