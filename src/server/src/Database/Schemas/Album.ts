import { z } from 'zod';

const DateSchema = z.union([z.string(), z.null()]).transform(x => {
  if (x === null) return null;
  return new Date(x);
});

export const BaseAlbumSchema = z.object({
  name: z.string(),
  release_date: DateSchema.optional().default(null)
});

export const AlbumSchema = BaseAlbumSchema.extend({
  artist: z.string().uuid(),
  songs: z.array(z.string().uuid()).optional().default([]),
  type: z.object({
    code: z.string().length(1),
    name: z.string()
  })
});
