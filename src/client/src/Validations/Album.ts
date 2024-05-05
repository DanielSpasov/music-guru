import { z } from 'zod';
import { FileSchema } from './File';

const AlbumTypeSchema = z.object({
  type: z
    .array(z.object({ code: z.string().length(1), name: z.string() }))
    .length(1)
});

export const BaseAlbumSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' }),
  image: FileSchema,
  release_date: z.union([z.date(), z.null()]).optional(),
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  songs: z.array(z.object({ uid: z.string().uuid() })).optional()
});

export const CreateAlbumSchema = BaseAlbumSchema.and(AlbumTypeSchema);
export const EditAlbumSchema = BaseAlbumSchema.omit({ image: true }).and(
  AlbumTypeSchema
);
