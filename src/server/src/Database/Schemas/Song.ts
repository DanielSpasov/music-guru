import { z } from 'zod';

export const BaseSongSchema = z.object({
  name: z.string(),
  release_date: z.coerce.date().optional()
});

export const SongSchema = BaseSongSchema.extend({
  artist: z.string().uuid(),
  features: z.array(z.string().uuid()).optional()
});
