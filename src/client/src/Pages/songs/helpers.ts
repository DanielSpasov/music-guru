import { z } from 'zod';
import { FileSchema } from '../../Utils/FileSchema';

export const Schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' }),
  release_date: z.coerce.date().optional()
});

export const EditSongSchema = Schema.extend({
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  features: z.array(z.object({ uid: z.string().uuid() })).optional()
});

export const SongSchema = Schema.extend({
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  image: FileSchema.optional(),
  features: z.array(z.object({ uid: z.string().uuid() })).optional()
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
