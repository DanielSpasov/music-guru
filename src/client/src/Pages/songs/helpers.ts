import { z } from 'zod';

export const Schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' }),
  release_date: z.coerce.date().optional()
});

export const SongSchema = Schema.extend({
  artist: z.string().uuid(),
  image: z.instanceof(FileList),
  features: z.array(z.string().uuid()).optional()
});

type SongModel = z.infer<typeof Schema>;
export interface Song extends SongModel {
  uid: string;
  image: string;
  created_at: Date;
  created_by: string;
  artist: string;
  features: string[];
}

export type UseActionsProps = {
  model: string;
  data?: Song;
  deleteSong?: (props: any) => any;
};
