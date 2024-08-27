import { z } from 'zod';

import { FileSchema, Require, SocialsSchema } from '../Utils';
import { FieldValues } from 'react-hook-form';

const DateSchema = z
  .string()
  .regex(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    'Invalid date format, must be mm/dd/yyyy'
  );

const SelectOptionSchema = z.object({ uid: z.string().uuid() }).nullish();

export const BaseAlbumSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(128, 'Name is too long.'),
  image: FileSchema,
  about: z.string().max(5000, 'Max length is 5000 characters'),
  release_date: z.union([DateSchema, z.literal('')]).nullish(),
  artist: SelectOptionSchema.superRefine(Require('Artist')),
  type: SelectOptionSchema.superRefine(Require('Type'))
});

export const CreateAlbumSchema = BaseAlbumSchema.and(SocialsSchema);
export const EditAlbumSchema = BaseAlbumSchema.omit({ image: true }).and(
  SocialsSchema
);

export type CreateAlbumData = z.infer<typeof BaseAlbumSchema> & FieldValues;
export type EditAlbumData = z.infer<typeof EditAlbumSchema> & FieldValues;
