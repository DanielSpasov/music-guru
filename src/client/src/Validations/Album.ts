import { RefinementCtx, z } from 'zod';
import { FileSchema } from './File';

const Required = (label: string) => (value: any, ctx: RefinementCtx) => {
  if (value === null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${label} is required.`
    });
  }
};

const AlbumTypeSchema = z
  .object({
    code: z.string().length(1),
    name: z.string(),
    uid: z.string().uuid()
  })
  .nullish()
  .superRefine(Required('Type'));

const DateSchema = z
  .string()
  .regex(
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    'Invalid date format, must be mm/dd/yyyy'
  );

const AlbumArtistSchema = z
  .object({ uid: z.string().uuid() })
  .nullish()
  .superRefine(Required('Artist'));

export const BaseAlbumSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(128, 'Name is too long.'),
  image: FileSchema,
  release_date: z.union([DateSchema, z.literal('')]),
  artist: AlbumArtistSchema,
  songs: z.array(z.object({ uid: z.string().uuid() })).optional(),
  type: AlbumTypeSchema
});

export const EditAlbumSchema = BaseAlbumSchema.omit({ image: true });
