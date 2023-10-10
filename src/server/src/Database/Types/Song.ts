import { Timestamp } from 'firebase/firestore/lite';
import { z } from 'zod';

import { BaseSongSchema } from '../Schemas';

export interface Song extends z.infer<typeof BaseSongSchema> {
  uid: string;
  image: string;
  created_at: Date;
  release_date: Date;
  created_by: string;
  artist: string;
  features: string[];
  albums: string[];
}

export interface DBSong {
  name: string;
  image: string;
  created_at: Timestamp;
  release_date: Timestamp;
  created_by: string;
  artist: string;
  features: string[];
  albums: string[];
}
