import { DocumentReference, Timestamp } from 'firebase/firestore/lite';
import { z } from 'zod';

import { BaseSongSchema } from '../Schemas';
import { Artist, Album, User } from './';

export interface Song extends z.infer<typeof BaseSongSchema> {
  uid: string;
  created_at: Date;
  created_by: Partial<User>;
  artist: Partial<Artist>;
  features: Partial<Artist>[];
  albums: Partial<Album>[];
}

export interface DBSong {
  albums: DocumentReference<Album>[];
  artist: DocumentReference<Artist>;
  created_at: Timestamp;
  created_by: DocumentReference<User>;
  features: DocumentReference<Artist>[];
  image: string;
  name: string;
  release_date: Timestamp;
}
