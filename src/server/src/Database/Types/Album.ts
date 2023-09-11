import { DocumentReference, Timestamp } from 'firebase/firestore/lite';
import { z } from 'zod';

import { BaseAlbumSchema } from '../Schemas';
import { Artist, User, Song } from './';

export interface Album extends z.infer<typeof BaseAlbumSchema> {
  uid: string;
  created_at: Date;
  created_by: Partial<User>;
  artist: Partial<Artist>;
  songs: Partial<Song>[];
}

export interface UnpopulatedAlbum extends z.infer<typeof BaseAlbumSchema> {
  uid: string;
  created_at: Date;
  created_by: string;
  artist: string;
  songs: string[];
}

export interface DBAlbum {
  name: string;
  image: string;
  created_by: DocumentReference<User>;
  artist: DocumentReference<Artist>;
  songs: DocumentReference<Song>[];
  created_at: Timestamp;
}
