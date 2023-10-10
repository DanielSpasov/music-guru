import { z } from 'zod';

export const BaseAlbumSchema = z.object({
  name: z.string()
});

export const AlbumSchema = BaseAlbumSchema.extend({
  artist: z.string().uuid(),
  songs: z.array(z.string().uuid())
});
