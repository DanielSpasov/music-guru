import { z, ZodSchema } from 'zod';

import { Model } from '../Types';

import { ArtistSchema } from './Artist';
import { AlbumSchema } from './Album';
import { SongSchema } from './Song';
import { UserSchema } from './User';

export { ArtistSchema } from './Artist';
export { AlbumSchema, BaseAlbumSchema } from './Album';
export { SongSchema, BaseSongSchema, PatchSongSchema } from './Song';
export { FileUploadSchema, FileSchema } from './File';
export { EditorSchema } from './Editor';
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
