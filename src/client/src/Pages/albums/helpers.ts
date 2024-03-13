import { z } from 'zod';

import { FileSchema } from '../../Utils/FileSchema';
import { Artist } from '../artists/helpers';
import { Song } from '../songs/helpers';

const DateSchema = z.union([z.date(), z.null()]);
const AlbumTypeSchema = z
  .array(z.object({ code: z.string().length(1), name: z.string() }))
  .length(1);

export const Schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' }),
  release_date: DateSchema.optional()
});

export const EditAlbumSchema = Schema.extend({
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  songs: z.array(z.object({ uid: z.string().uuid() })).optional(),
  type: AlbumTypeSchema
});

export const AlbumSchema = Schema.extend({
  image: FileSchema,
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  songs: z.array(z.object({ uid: z.string().uuid() })).optional(),
  type: AlbumTypeSchema
});

type AlbumModel = z.infer<typeof Schema>;
export interface Album extends AlbumModel {
  uid: string;
  type: {
    code: string;
    name: string;
  };
  image: string;
  created_at: Date;
  release_date?: Date;
  created_by: string;
  artist: Artist;
  songs?: Song[];
}
