import { z } from 'zod';

import { Song } from './Song';
import { User } from './User';
import { Album } from './Album';
import { DocumentReference, Timestamp } from 'firebase/firestore/lite';

export const ArtistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type ArtistModel = z.infer<typeof ArtistSchema>;

export interface Artist extends ArtistModel {
  uid: string;
  created_at: Date;
  created_by: Partial<User>;
  albums: Partial<Album>[];
  mixtapes: unknown[];
  songs: Partial<Song>[];
  features: Partial<Song>[];
}

export type DBArtist = {
  albums: DocumentReference<Album>[];
  created_at: Timestamp;
  created_by: DocumentReference<User>;
  features: DocumentReference<Song>[];
  image: string;
  name: string;
  songs: DocumentReference<Song>[];
};
