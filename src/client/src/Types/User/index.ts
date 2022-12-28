import { z } from 'zod';

export const userSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: 'Username is too short.' })
      .max(16, { message: 'Username is too long.' })
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

export const userSchemaSignIn = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string()
});

export type User = z.infer<typeof userSchema>;
