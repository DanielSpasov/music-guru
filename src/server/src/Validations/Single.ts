import { z } from 'zod';
import { Artist } from './Artist';

export const schema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

type SingleModel = z.infer<typeof schema>;
export interface Single extends SingleModel {
  uid: string;
  created: Date;
  artist: Artist;
  album?: any; // TODO: Replace with Album Model when its ready
  mixtape?: any; // TODO: Replace with Mixtape Model when its ready
}
