import { z } from 'zod';
import { User } from '../auth/helpers';
import { Single } from '../singles/helpers';

export const artistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type ArtistModel = z.infer<typeof artistSchema>;
export interface Artist extends ArtistModel {
  uid: string;
  created: Date;
  created_by: User;
  albums: [];
  mixtapes: [];
  singles: Single[];
  features: Single[];
}

export type UseActionsProps = {
  model: string;
  data?: Artist;
};
