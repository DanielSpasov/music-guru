import { z } from 'zod';

export const ArtistSchema = z.object({
  name: z.string(),
  about: z.string().max(5000).optional().default(''),
  favorites: z.number().optional().default(0),
  links: z
    .array(z.object({ name: z.string(), url: z.string().url() }))
    .refine(val => val.filter(item => item.url !== null))
    .default([])
});
