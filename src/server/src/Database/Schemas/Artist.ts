import { z } from 'zod';

export const ArtistSchema = z.object({
  name: z.string()
});
