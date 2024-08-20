import { z, ZodSchema } from 'zod';

import { Model } from '../Types';

import { ArtistSchema, EditArtistSchema } from './Artist';
import { AlbumSchema, EditAlbumSchema } from './Album';
import { SongSchema, EditSongSchema } from './Song';
import { UserSchema } from './User';

export { ArtistSchema } from './Artist';
export { AlbumSchema, BaseAlbumSchema } from './Album';
export { SongSchema, BaseSongSchema } from './Song';
export { FileUploadSchema, FileSchema } from './File';
export { EditorSchema, EditorsSchema } from './Editor';
export {
  BaseUserSchema,
  SignInSchema,
  SignUpSchema,
  UserSchema,
  EmailSchema,
  UsernameSchema
} from './User';

export const validationSchemas: Record<Model, ZodSchema> = {
  albums: AlbumSchema,
  artists: ArtistSchema,
  songs: SongSchema,
  users: UserSchema,
  album_types: z.object({})
};

export const editValidationSchemas: Record<Model, ZodSchema> = {
  albums: EditAlbumSchema,
  artists: EditArtistSchema,
  songs: EditSongSchema,
  users: UserSchema,
  album_types: z.object({})
};
