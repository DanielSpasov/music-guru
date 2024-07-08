import { z } from 'zod';

const OptionalURL = z.union([z.string().url().optional(), z.literal('')]);

export const SocialsSchema = z.object({
  spotify: OptionalURL,
  apple_music: OptionalURL,
  youtube: OptionalURL,
  soundcloud: OptionalURL
});

export const ArtistSocialsSchema = z
  .object({
    instagram: OptionalURL,
    x: OptionalURL,
    facebook: OptionalURL
  })
  .merge(SocialsSchema);
