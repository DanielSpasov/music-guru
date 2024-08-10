import { z } from 'zod';

import { SignInSchema, SignUpSchema, UserSchema } from '../Validations';

export type SignUpData = z.infer<typeof SignUpSchema>;

export type SignInData = z.infer<typeof SignInSchema>;

export interface User extends z.infer<typeof UserSchema> {
  uid: string;
  created_at: Date;
}

export interface DBUser {
  uid: string;
  username: string;
  email: string;
  password: string;
  verified: boolean;
  created_at: Date;
  favorites: {
    artists?: string[];
    albums?: string[];
  };
}
