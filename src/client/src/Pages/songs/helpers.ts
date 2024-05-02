import { z } from 'zod';
import { FileSchema } from '../../Utils/FileSchema';
import { Artist } from '../../Types/Artist';

const DateSchema = z.union([z.date(), z.null()]);

export const Schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' }),
  release_date: DateSchema.optional()
});

export const EditSongSchema = Schema.extend({
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  features: z.array(z.object({ uid: z.string().uuid() })).optional()
});

export const SongSchema = Schema.extend({
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  image: FileSchema.optional(),
  features: z.array(z.object({ uid: z.string().uuid() })).optional()
});

export const VerseSchema = z.object({
  title: z.string(),
  lyrics: z.string().max(10000, 'Max length is 10000 characters')
});

type SongModel = z.infer<typeof Schema>;

export type Verse = {
  title: string;
  lyrics: string;
  number: number;
};
export interface Song extends SongModel {
  uid: string;
  image?: string;
  created_at: Date;
  created_by: string;
  artist: Artist;
  features: Artist[];
  verses: Verse[];
}

export interface ListSong {
  uid: string;
  name: string;
  image: string;
  artist: string;
}
