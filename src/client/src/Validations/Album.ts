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

const DateSchema = z
  .string()
  .regex(
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    'Invalid date format, must be mm/dd/yyyy'
  );

const SelectOptionSchema = z.object({ uid: z.string().uuid() }).nullish();

export const BaseAlbumSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(128, 'Name is too long.'),
  image: FileSchema,
  release_date: z.union([DateSchema, z.literal('')]),
  artist: SelectOptionSchema.superRefine(Required('Artist')),
  songs: z.array(SelectOptionSchema.superRefine(Required('Song'))).optional(),
  type: SelectOptionSchema.superRefine(Required('Type'))
});

export const EditAlbumSchema = BaseAlbumSchema.omit({ image: true });
