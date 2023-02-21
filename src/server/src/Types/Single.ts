import { z } from 'zod';

import { Artist } from './Artist';
import { User } from './User';

const Schema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export const SingleSchema = Schema.extend({
  artist: z.object({ uid: z.string().min(8).max(8) })
});

type SingleSchemaType = z.infer<typeof Schema>;
export interface Single extends SingleSchemaType {
  uid: string;
  created_at: Date;
  created_by: User;
  artist: Artist;
  features: Artist[];
}
