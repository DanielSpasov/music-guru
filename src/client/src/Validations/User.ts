import { z } from 'zod';

export const BaseUserSchema = z.object({
  username: z
    .union([
      z
        .string()
        .min(2, { message: 'Username is too short.' })
        .max(30, { message: 'Username is too long.' }),
      z.string().length(0)
    ])
    .optional(),
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string(),
  repeat_password: z.string()
});

export const SignUpSchema = BaseUserSchema.superRefine(
  ({ repeat_password, password }, context) => {
    if (repeat_password !== password) {
      context.addIssue({
        code: 'custom',
        message: "Passwords doesn't match.",
        path: ['password', 'repeat_password']
      });
    }
  }
);

export const SignInSchema = BaseUserSchema.pick({
  email: true,
  password: true
});
