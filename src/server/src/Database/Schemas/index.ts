import { ZodSchema } from 'zod';

import { Collection } from '../types';

import { ArtistSchema } from './Artist';
import { AlbumSchema } from './Album';
import { SongSchema } from './Song';
import { UserSchema } from './User';

export { ArtistSchema } from './Artist';
export { AlbumSchema, BaseAlbumSchema } from './Album';
export { SongSchema, BaseSongSchema } from './Song';
export {
  BaseUserSchema,
  SignInSchema,
  SignUpSchema,
  UserSchema,
  EmailSchema,
  UsernameSchema
} from './User';

export const validationSchemas: Record<Collection, ZodSchema> = {
  albums: AlbumSchema,
  artists: ArtistSchema,
  songs: SongSchema,
  users: UserSchema
};
