import { z } from 'zod';

import { Artist } from './Artist';
import { User } from './User';

const Schema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' }),
  release_date: z.coerce.date().optional()
});

const UidSchema = z.string().min(8).max(8);

export const SongSchema = Schema.extend({
  artist: UidSchema,
  features: z.array(UidSchema).optional()
});

type SongSchemaType = z.infer<typeof Schema>;
export interface Song extends SongSchemaType {
  uid: string;
  created_at: Date;
  created_by: User;
  artist: Artist;
  features: Artist[];
}
