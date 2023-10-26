import { z } from 'zod';

export const BaseAlbumSchema = z.object({
  name: z.string(),
  release_date: z.coerce.date().optional()
});

export const AlbumSchema = BaseAlbumSchema.extend({
  artist: z.string().uuid(),
  songs: z.array(z.string().uuid()).optional()
});
