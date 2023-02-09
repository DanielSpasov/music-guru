import { z } from 'zod';

export const artistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type Artist = z.infer<typeof artistSchema>;
