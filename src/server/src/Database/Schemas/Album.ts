import { z } from 'zod';

const DateSchema = z.union([z.string(), z.null()]).transform(x => {
  if (x === null) return null;
  return new Date(x);
});

export const BaseAlbumSchema = z.object({
  name: z.string(),
  release_date: DateSchema.optional()
});

export const AlbumSchema = BaseAlbumSchema.extend({
  artist: z.string().uuid(),
  songs: z.array(z.string().uuid()).optional()
});
