import { z } from 'zod';

export const UsernameSchema = z.union([
  z
    .string()
    .min(2, { message: 'Username is too short.' })
    .max(30, { message: 'Username is too long.' }),
  z.string().length(0) // empty string
]);

export const EmailSchema = z.string().email({ message: 'Invalid email.' });

export const BaseUserSchema = z.object({
  username: UsernameSchema,
  email: EmailSchema,
  password: z.string(),
  repeat_password: z.string(),
  verified: z.boolean()
});

export const SignUpSchema = BaseUserSchema.omit({ verified: true }).superRefine(
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

export const UserSchema = BaseUserSchema.omit({
  repeat_password: true,
  password: true
});
