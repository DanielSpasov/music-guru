import { z } from 'zod';

export const Schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(128, { message: 'Name is too long.' })
});

export const EditAlbumSchema = Schema.extend({
  artist: z.string().uuid(),
  songs: z.array(z.string().uuid())
});

export const AlbumSchema = Schema.extend({
  artist: z.string().uuid(),
  image: z.instanceof(FileList),
  songs: z.array(z.string().uuid())
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
