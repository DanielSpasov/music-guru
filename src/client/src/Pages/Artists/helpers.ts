import { z } from 'zod';
import { User } from '../auth/helpers';
import { Song } from '../songs/helpers';
import { Album } from '../albums/helpers';
import { ModelKeys } from '../../Api/helpers';

export const ArtistSchema = z.object({
  name: z.string(),
  image: z.instanceof(FileList)
});

export const EditArtistSchema = ArtistSchema.pick({ name: true });

const ArtistModelSchema = ArtistSchema.omit({ image: true });
type ArtistModel = z.infer<typeof ArtistModelSchema>;
export interface Artist extends ArtistModel {
  image: string;
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

export type DiscographyType = {
  [K in keyof Artist]: Artist[K] extends any[] ? K : never;
}[keyof Artist];

export type View = {
  model: ModelKeys;
  key: DiscographyType;
  label: string;
};

export const views: View[] = [
  { model: 'songs', key: 'songs', label: 'Songs' },
  { model: 'albums', key: 'albums', label: 'Albums' },
  { model: 'songs', key: 'features', label: 'Features' }
];
