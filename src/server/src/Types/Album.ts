import { z } from 'zod';

import { Artist } from './Artist';
import { User } from './User';
import { Song } from './Song';
import { DocumentReference, Timestamp } from 'firebase/firestore/lite';

const Schema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

const UidSchema = z.string().min(8).max(8);

export const AlbumSchema = Schema.extend({
  artist: UidSchema,
  songs: z.array(UidSchema)
});

type AlbumSchemaType = z.infer<typeof Schema>;
export interface Album extends AlbumSchemaType {
  uid: string;
  created_at: Date;
  created_by: Partial<User>;
  artist: Partial<Artist>;
  songs: Partial<Song>[];
}

export type DBAlbum = {
  name: string;
  image: string;
  created_by: DocumentReference<User>;
  artist: DocumentReference<Artist>;
  songs: DocumentReference<Song>[];
  created_at: Timestamp;
};
