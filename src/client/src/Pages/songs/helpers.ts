import { z } from 'zod';
import { Artist } from '../artists/helpers';
import { User } from '../auth/helpers';
import { Album } from '../albums/helpers';

export const Schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' }),
  image: z.string().url({ message: 'Invalid url.' }),
  release_date: z.coerce.date().optional()
});

const UidSchema = z
  .string({ required_error: 'Artist is required.' })
  .min(8, { message: 'Invalid Artist.' })
  .max(8, { message: 'Invalid Artist.' });

export const SongSchema = Schema.extend({
  artist: UidSchema,
  features: z.array(UidSchema).optional()
});

type SongModel = z.infer<typeof Schema>;
export interface Song extends SongModel {
  uid: string;
  created_at: Date;
  created_by: User;
  artist: Artist;
  features: Artist[];
  albums: Album[];
}

export type UseActionsProps = {
  model: string;
  data?: Song;
  deleteSong?: (props: any) => any;
};
