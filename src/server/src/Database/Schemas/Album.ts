import { z } from 'zod';

export const BaseAlbumSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

const UidSchema = z.string().min(8).max(8);

export const AlbumSchema = BaseAlbumSchema.extend({
  artist: UidSchema,
  songs: z.array(UidSchema)
});
