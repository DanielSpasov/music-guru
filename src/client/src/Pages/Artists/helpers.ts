import { z } from 'zod';

import { Song } from '../songs/helpers';
import { Album } from '../albums/helpers';
import { FileSchema } from '../../Utils/FileSchema';

export const ArtistSchema = z.object({
  name: z.string(),
  image: FileSchema
});

export const EditArtistSchema = ArtistSchema.pick({ name: true });

const ArtistModelSchema = ArtistSchema.omit({ image: true });
type ArtistModel = z.infer<typeof ArtistModelSchema>;
export interface Artist extends ArtistModel {
  image: string;
  uid: string;
  created_at: Date;
  created_by: string;
  albums: Album[];
  songs: Song[];
  features: Song[];
}

export type UseActionsProps = {
  model: string;
  data?: Artist;
};
