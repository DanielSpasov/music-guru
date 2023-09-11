import { z } from 'zod';

export const BaseSongSchema = z.object({
  name: z.string(),
  image: z
    .union([
      z.string().url({ message: 'Invalid url.' }),
      z.string().length(0) // Optional/empty string
    ])
    .optional(),
  release_date: z.coerce.date().optional()
});

const UidSchema = z.string().min(8).max(8);

export const SongSchema = BaseSongSchema.extend({
  artist: UidSchema,
  features: z.array(UidSchema).optional()
});
