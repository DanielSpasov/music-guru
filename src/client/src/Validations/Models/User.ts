import { z } from 'zod';

const BaseUserSchema = z.object({
  username: z
    .union([
      z
        .string()
        .min(2, 'Username is too short.')
        .max(30, 'Username is too long.'),
      z.string().length(0)
    ])
    .optional(),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.'),
  repeat_password: z.string().min(1, 'Repeat Password is required.')
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
