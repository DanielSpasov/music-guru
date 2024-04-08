import { z } from 'zod';

const OptionalURL = z.union([z.string().url().optional(), z.literal('')]);

export const SocialsSchema = z.object({
  instagram: OptionalURL,
  x: OptionalURL,
  facebook: OptionalURL,
  spotify: OptionalURL,
  apple_music: OptionalURL,
  youtube: OptionalURL,
  soundcloud: OptionalURL
});
