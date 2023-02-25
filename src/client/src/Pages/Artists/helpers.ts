import { z } from 'zod';
import { User } from '../auth/helpers';
import { Song } from '../songs/helpers';

export const ArtistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type ArtistModel = z.infer<typeof ArtistSchema>;
export interface Artist extends ArtistModel {
  uid: string;
  created_at: Date;
  created_by: User;
  albums: [];
  mixtapes: [];
  songs: Song[];
  features: Song[];
}

export type UseActionsProps = {
  model: string;
  data?: Artist;
};
