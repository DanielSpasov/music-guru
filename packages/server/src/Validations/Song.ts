import { z } from 'zod';
import { EditorSchema } from './Editor';

const DateSchema = z.union([z.string(), z.null()]).transform(x => {
  if (x === null || x === '') return null;
  return new Date(x);
});

export const VerseSchema = z.object({
  title: z.string(),
  lyrics: z.string().max(10000, 'Max length is 10000 characters'),
  number: z.number()
});

export const LinkSchema = z.object({
  name: z.string(),
  url: z.string().url()
});

export const BaseSongSchema = z.object({
  name: z.string(),
  image: z.string().optional().default(''),
  release_date: DateSchema.optional().default(null),
  artist: z.string().uuid(),
  features: z.array(z.string().uuid()).optional().default([]),
  about: z.string().max(5000, 'Max length is 5000 characters'),
  links: z
    .array(LinkSchema)
    .refine(link => link.filter(item => item.url !== null))
    .default([]),
  favorites: z.number().optional().default(0)
});

export const SongSchema = BaseSongSchema.extend({
  verses: z.array(VerseSchema).optional().default([]),
  editors: z.array(EditorSchema).optional().default([])
});

export const EditSongSchema = BaseSongSchema.omit({
  image: true,
  favorites: true
});
