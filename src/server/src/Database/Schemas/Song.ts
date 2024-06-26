import { z } from 'zod';

const DateSchema = z.union([z.string(), z.null()]).transform(x => {
  if (x === null) return null;
  return new Date(x);
});

export const BaseSongSchema = z.object({
  name: z.string(),
  image: z.string().optional().default(''),
  release_date: DateSchema.optional().default(null)
});

export const SongSchema = BaseSongSchema.extend({
  artist: z.string().uuid(),
  features: z.array(z.string().uuid()).optional().default([])
});
