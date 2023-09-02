import { z } from 'zod';
import { SignInSchema, SignUpSchema, UserSchema } from '../Schemas';

export type SignUpData = z.infer<typeof SignUpSchema>;

export type SignInData = z.infer<typeof SignInSchema>;

export interface User extends z.infer<typeof UserSchema> {
  uid: string;
  created_at: Date;
}
