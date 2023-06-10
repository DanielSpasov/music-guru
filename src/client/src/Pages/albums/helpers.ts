import { z } from 'zod';
import { Artist } from '../artists/helpers';
import { User } from '../auth/helpers';

export const Schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' }),
  image: z.string().url({ message: 'Invalid url.' })
});

const UidSchema = z
  .string({ required_error: 'Artist is required.' })
  .min(8, { message: 'Invalid Artist.' })
  .max(8, { message: 'Invalid Artist.' });

export const AlbumSchema = Schema.extend({
  artist: UidSchema
});

type AlbumModel = z.infer<typeof Schema>;
export interface Album extends AlbumModel {
  uid: string;
  created_at: Date;
  created_by: User;
  artist: Artist;
  discs: any[];
}

export type UseActionsProps = {
  model: string;
  data?: Album;
  deleteAlbum?: (props: any) => any;
};
