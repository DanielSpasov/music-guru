import { z } from 'zod';

export const schema = z.object({
  username: z
    .union([
      z
        .string()
        .min(2, { message: 'Username is too short.' })
        .max(16, { message: 'Username is too long.' }),
      z.string().length(0) // Optional/empty string
    ])
    .optional(),
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string(),
  repeat_password: z.string()
});

export const SignUpSchema = schema.superRefine(
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
export type SignUpData = z.infer<typeof SignUpSchema>;

export const SignInSchema = schema.pick({ email: true, password: true });
export type SignInData = z.infer<typeof SignInSchema>;

export const UserSchema = schema.omit({ repeat_password: true });
export type User = z.infer<typeof UserSchema>;
