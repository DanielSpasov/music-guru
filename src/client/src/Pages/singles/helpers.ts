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

export const SingleSchema = Schema.extend({
  artist: UidSchema,
  features: z.array(UidSchema).optional()
});

type SingleModel = z.infer<typeof Schema>;
export interface Single extends SingleModel {
  uid: string;
  created: Date;
  created_by: User;
  artist: Artist;
  features: Artist[];
  album: any; // TODO: Replace with Album Model when its ready
  mixtape: any; // TODO: Replace with Mixtape Model when its ready
}

export type UseActionsProps = {
  model: string;
  data?: Single;
  deleteSingle?: Function;
};
