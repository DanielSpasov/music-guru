import { Document } from 'mongoose';
import { z } from 'zod';

import { Model } from '../Database';
import { SignInSchema, SignUpSchema } from '../../Validations';

export type SignUpData = z.infer<typeof SignUpSchema>;

export type SignInData = z.infer<typeof SignInSchema>;

export type User = Document & {
  uid: string;
  username: string;
  email: string;
  password: string;
  verified: boolean;
  created_at: Date;
  favorites: {
    [key in Exclude<Model, 'users' | 'album_types'>]: string[];
  };
};
