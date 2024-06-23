import { RefinementCtx, z } from 'zod';

import { OptionalFileSchema } from './File';
import { SocialsSchema } from './Socials';

export const VerseSchema = z.object({
  title: z.string(),
  lyrics: z.string().max(10000, 'Max length is 10000 characters')
});

const Required = (label: string) => (value: any, ctx: RefinementCtx) => {
  if (value === null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${label} is required.`
    });
  }
};

const DateSchema = z.union([
  z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
      'Invalid date format, must be mm/dd/yyyy'
    ),
  z.literal('')
]);

const ArtistSchema = z
  .object({ uid: z.string().uuid() })
  .nullish()
  .superRefine(Required('Artist'));

export const BaseSongSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(128, 'Name is too long.'),
  image: OptionalFileSchema,
  release_date: DateSchema,
  artist: ArtistSchema,
  features: z.array(ArtistSchema).optional(),
  about: z.string().max(10000, 'Max length is 10000 characters')
});

export const CreateSongSchema = BaseSongSchema.and(SocialsSchema);

export const EditSongSchema = BaseSongSchema.omit({ image: true }).and(
  SocialsSchema
);
