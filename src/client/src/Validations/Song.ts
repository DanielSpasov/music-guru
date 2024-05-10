import { z } from 'zod';

import { SocialsSchema } from './Socials';
import { FileSchema } from './File';

export const VerseSchema = z.object({
  title: z.string(),
  lyrics: z.string().max(10000, 'Max length is 10000 characters')
});

export const BaseSongSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' }),
  release_date: z.union([z.date(), z.null()]).optional(),
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  features: z.array(z.object({ uid: z.string().uuid() })).optional(),
  about: z.string().max(10000, { message: 'Max length is 10000 characters' })
});

export const CreateSongSchema = BaseSongSchema.extend({
  image: FileSchema.optional()
}).and(SocialsSchema);

export const EditSongSchema = BaseSongSchema.and(SocialsSchema);
