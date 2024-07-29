import { FieldValues } from 'react-hook-form';
import { z } from 'zod';

const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol');

const BaseUserSchema = z.object({
  username: z
    .union([
      z
        .string()
        .min(2, 'Username is too short.')
        .max(30, 'Username is too long.'),
      z.literal('')
    ])
    .optional(),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Invalid email address.'),
  password: PasswordSchema,
  repeat_password: PasswordSchema
});

export const SignUpSchema = BaseUserSchema.refine(
  ({ password, repeat_password }) => password === repeat_password,
  {
    message: 'Passwords do not match.',
    path: ['repeat_password']
  }
);

export const SignInSchema = BaseUserSchema.pick({
  email: true,
  password: true
});

export const UpdateUserSchema = BaseUserSchema.pick({
  username: true,
  email: true
});

export const ChangePassSchema = z
  .object({
    current_password: PasswordSchema,
    new_password: PasswordSchema,
    confirm_new_password: PasswordSchema
  })
  .refine(
    ({ current_password, new_password }) => current_password !== new_password,
    {
      message: 'Passwords cannot be the same.',
      path: ['new_password']
    }
  )
  .refine(
    ({ new_password, confirm_new_password }) =>
      new_password === confirm_new_password,
    {
      message: 'Passwords do not match.',
      path: ['confirm_new_password']
    }
  );

export type SignInData = z.infer<typeof SignInSchema> & FieldValues;
export type SignUpData = z.infer<typeof SignUpSchema> & FieldValues;
export type UpdateUserData = z.infer<typeof UpdateUserSchema> & FieldValues;
export type ChangePassData = z.infer<typeof ChangePassSchema> & FieldValues;
