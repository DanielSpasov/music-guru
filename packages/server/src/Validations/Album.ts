import { z } from 'zod';

const DateSchema = z.union([z.string(), z.null()]).transform(x => {
  if (x === null || x === '') return null;
  return new Date(x);
});

export const LinkSchema = z.object({
  name: z.string(),
  url: z.string().url()
});

export const BaseAlbumSchema = z.object({
  name: z.string(),
  release_date: DateSchema.optional().default(null),
  favorites: z.number().optional().default(0),
  artist: z.string().uuid(),
  songs: z.array(z.string().uuid()).optional().default([]),
  about: z.string().max(5000),
  links: z
    .array(LinkSchema)
    .refine(link => link.filter(item => item.url !== null))
    .default([]),
  type: z.string().uuid()
});

export const AlbumSchema = BaseAlbumSchema.omit({ favorites: true });
export const EditAlbumSchema = BaseAlbumSchema.omit({ favorites: true });
