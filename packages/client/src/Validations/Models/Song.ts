import { z } from 'zod';

import { OptionalFileSchema, SocialsSchema, Require } from '../Utils';
import { FieldValues } from 'react-hook-form';

export const VerseSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  lyrics: z
    .string()
    .min(1, 'Lyrics are required.')
    .max(10000, 'Max length is 10000 characters.')
});

const DateSchema = z.union([
  z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      'Invalid date format, must be mm/dd/yyyy'
    ),
  z.literal('')
]);

const SelectOptionSchema = z.object({ uid: z.string().uuid() }).nullish();

export const BaseSongSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(128, 'Name is too long.'),
  image: OptionalFileSchema,
  release_date: DateSchema,
  artist: SelectOptionSchema.superRefine(Require('Artist')),
  features: z
    .array(SelectOptionSchema.superRefine(Require('Artist')))
    .optional(),
  about: z.string().max(5000, 'Max length is 5000 characters')
});

export const CreateSongSchema = BaseSongSchema.and(SocialsSchema);
export const EditSongSchema = BaseSongSchema.omit({ image: true }).and(
  SocialsSchema
);

export type CreateSongData = z.infer<typeof CreateSongSchema> & FieldValues;
export type EditSongData = z.infer<typeof EditSongSchema> & FieldValues;

export type CreateVerseData = z.infer<typeof VerseSchema> & FieldValues;
