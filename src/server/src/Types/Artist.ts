import { z } from 'zod';

import { Song } from './Song';
import { User } from './User';

export const ArtistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type ArtistModel = z.infer<typeof ArtistSchema>;

export interface Artist extends ArtistModel {
  uid: string;
  created: Date;
  created_by: User;
  albums: any[];
  mixtapes: any[];
  songs: Song[];
  features: Song[];
}
