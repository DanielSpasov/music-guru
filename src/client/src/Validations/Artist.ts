import { z } from 'zod';

import { FileSchema } from './File';
import { ArtistSocialsSchema } from './Socials';

export const BaseArtistSchema = z.object({
  name: z.string(),
  about: z.string().max(5000, 'Max length is 5000 characters'),
  image: FileSchema
});

export const CreateArtistSchema = BaseArtistSchema.and(ArtistSocialsSchema);
export const EditArtistSchema = BaseArtistSchema.omit({ image: true }).and(
  ArtistSocialsSchema
);
