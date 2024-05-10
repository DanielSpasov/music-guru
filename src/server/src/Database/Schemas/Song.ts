import { z } from 'zod';

const DateSchema = z.union([z.string(), z.null()]).transform(x => {
  if (x === null) return null;
  return new Date(x);
});

export const BaseSongSchema = z.object({
  name: z.string(),
  image: z.string().optional().default(''),
  release_date: DateSchema.optional().default(null)
});

export const VerseSchema = z.object({
  title: z.string(),
  lyrics: z.string().max(10000, 'Max length is 10000 characters'),
  number: z.number()
});

export const SongSchema = BaseSongSchema.extend({
  artist: z.string().uuid(),
  features: z.array(z.string().uuid()).optional().default([]),
  verses: z.array(VerseSchema).optional().default([]),
  links: z
    .array(z.object({ name: z.string(), url: z.string().url() }))
    .refine(val => val.filter(item => item.url !== null))
    .default([]),
  about: z.string().max(10000, 'Max length is 10000 characters')
});
