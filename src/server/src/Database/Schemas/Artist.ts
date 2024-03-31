import { z } from 'zod';

export const ArtistSchema = z.object({
  name: z.string(),
  bio: z.string().max(5000).optional().default('')
});
