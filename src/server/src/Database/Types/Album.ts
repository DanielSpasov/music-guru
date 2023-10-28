import { Timestamp } from 'firebase/firestore/lite';
import { z } from 'zod';

import { BaseAlbumSchema } from '../Schemas';

export interface Album extends z.infer<typeof BaseAlbumSchema> {
  uid: string;
  image: string;
  created_at: Date;
  created_by: string;
  artist: string;
  songs: string[];
  release_date: Date | null;
}

export interface DBAlbum {
  name: string;
  image: string;
  created_by: string;
  artist: string;
  songs: string[];
  release_date: Timestamp | null;
  created_at: Timestamp;
}
