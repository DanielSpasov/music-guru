import { z } from 'zod';

export const SignUpSchema = z
  .object({
    username: z
      .union([
        z
          .string()
          .min(2, { message: 'Username is too short.' })
          .max(16, { message: 'Username is too long.' }),
        z.string().length(0) // Empty string
      ])
      .optional(),
    email: z.string().email({ message: 'Invalid email.' }),
    password: z.string(),
    repeatPassword: z.string()
  })
  .superRefine(({ repeatPassword, password }, context) => {
    if (repeatPassword !== password) {
      context.addIssue({
        code: 'custom',
        message: "Passwords doesn't match.",
        path: ['password', 'repeat-password']
      });
    }
  });

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string()
});

export type User = z.infer<typeof SignUpSchema>;
