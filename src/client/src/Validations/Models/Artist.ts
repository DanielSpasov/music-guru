import { z } from 'zod';

import { FileSchema, ArtistSocialsSchema } from '../Utils';
import { FieldValues } from 'react-hook-form';

export const BaseArtistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: FileSchema,
  about: z.string().max(5000, 'Max length is 5000 characters')
});

export const CreateArtistSchema = BaseArtistSchema.and(ArtistSocialsSchema);
export const EditArtistSchema = BaseArtistSchema.omit({ image: true }).and(
  ArtistSocialsSchema
);

export type CreateArtistData = z.infer<typeof CreateArtistSchema> & FieldValues;
export type EditArtistData = z.infer<typeof EditArtistSchema> & FieldValues;
