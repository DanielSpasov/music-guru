import { z } from 'zod';

import { FileSchema } from '../../Utils/FileSchema';

export const Schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' })
});

export const EditAlbumSchema = Schema.extend({
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  songs: z.array(z.object({ uid: z.string().uuid() })).optional()
});

export const AlbumSchema = Schema.extend({
  artist: z.array(z.object({ uid: z.string().uuid() })).length(1),
  image: FileSchema,
  songs: z.array(z.object({ uid: z.string().uuid() })).optional()
});

type AlbumModel = z.infer<typeof Schema>;
export interface Album extends AlbumModel {
  uid: string;
  image: string;
  created_at: Date;
  created_by: string;
  artist: string;
  songs: string[];
}

export type UseActionsProps = {
  model: string;
  data?: Album;
  deleteAlbum?: (props: any) => any;
};
