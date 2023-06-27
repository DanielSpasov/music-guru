import { z } from 'zod';

import { Artist } from './Artist';
import { User } from './User';

const Schema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

const UidSchema = z.string().min(8).max(8);

export const AlbumSchema = Schema.extend({
  artist: UidSchema
});

type AlbumSchemaType = z.infer<typeof Schema>;
export interface Album extends AlbumSchemaType {
  uid: string;
  created_at: Date;
  created_by: User;
  artist: Artist;
}
