import { DocumentReference, Timestamp } from 'firebase/firestore/lite';
import { z } from 'zod';

import { ArtistSchema } from '../Schemas';
import { Album, Song, User } from './';

export interface Artist extends z.infer<typeof ArtistSchema> {
  uid: string;
  created_at: Date;
  created_by: Partial<User>;
  albums: Partial<Album>[];
  songs: Partial<Song>[];
  features: Partial<Song>[];
}

export interface UnpopulatedArtist extends z.infer<typeof ArtistSchema> {
  uid: string;
  created_at: Date;
  created_by: string;
  albums: string[];
  songs: string[];
  features: string[];
}

export interface DBArtist {
  albums: DocumentReference<Album>[];
  created_at: Timestamp;
  created_by: DocumentReference<User>;
  features: DocumentReference<Song>[];
  image: string;
  name: string;
  songs: DocumentReference<Song>[];
}
