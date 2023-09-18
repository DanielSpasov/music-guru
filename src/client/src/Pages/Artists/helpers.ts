import { z } from 'zod';
import { User } from '../auth/helpers';
import { Song } from '../songs/helpers';
import { Album } from '../albums/helpers';

export const ArtistSchema = z.object({
  name: z.string(),
  image: z.instanceof(FileList)
});

export type ArtistModel = z.infer<typeof ArtistSchema>;
export interface Artist extends ArtistModel {
  uid: string;
  created_at: Date;
  created_by: User;
  albums: Album[];
  songs: Song[];
  features: Song[];
}

export type UseActionsProps = {
  model: string;
  data?: Artist;
};
