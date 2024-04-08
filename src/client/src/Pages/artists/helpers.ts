import { z } from 'zod';

import { Song } from '../songs/helpers';
import { Album } from '../albums/helpers';
import { FileSchema } from '../../Utils/FileSchema';

export const ArtistSchema = z.object({
  name: z.string(),
  bio: z.string().max(5000, 'Max Biography length is 20 characters').optional(),
  image: FileSchema
});

export const EditArtistSchema = ArtistSchema.omit({ image: true })
  .and(
    z.object({
      instagram: z.string().url().optional()
    })
  )
  .transform(data => {
    console.log(data);
    return {
      ...data,
      links: [{ name: 'instagram', url: data.instagram }]
    };
  });

const ArtistModelSchema = ArtistSchema.omit({ image: true });
export interface Artist extends z.infer<typeof ArtistModelSchema> {
  image: string;
  uid: string;
  created_at: Date;
  created_by: string;
  albums: Album[];
  songs: Song[];
  features: Song[];
  favorites: number;
}

export interface ListArtist {
  uid: string;
  name: string;
  image: string;
  favorites: number;
}
