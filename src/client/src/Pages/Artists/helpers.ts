import { z } from 'zod';

export const artistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type ArtistModel = z.infer<typeof artistSchema>;
export interface Artist extends ArtistModel {
  uid: string;
  created: Date;
  albums: [];
  mixtapes: [];
  singles: [];
}

export type UseActionsProps = {
  model: string;
};
