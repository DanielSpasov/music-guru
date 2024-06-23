import { z } from 'zod';

const DateSchema = z.union([z.string(), z.null()]).transform(x => {
  if (x === null) return null;
  return new Date(x);
});

export const BaseAlbumSchema = z.object({
  name: z.string(),
  release_date: DateSchema.optional().default(null),
  favorites: z.number().optional().default(0)
});

export const AlbumSchema = BaseAlbumSchema.extend({
  artist: z.string().uuid(),
  songs: z.array(z.string().uuid()).optional().default([]),
  type: z.string().uuid()
});
