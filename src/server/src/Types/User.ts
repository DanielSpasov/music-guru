import { z } from 'zod';

export const usernameSchema = z.union([
  z
    .string()
    .min(2, { message: 'Username is too short.' })
    .max(30, { message: 'Username is too long.' }),
  z.string().length(0) // empty string
]);

export const emailSchema = z.string().email({ message: 'Invalid email.' });

export const schema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: z.string(),
  repeat_password: z.string(),
  verified: z.boolean()
});

const OmittedSignUpSchema = schema.omit({ verified: true });
export const SignUpSchema = OmittedSignUpSchema.superRefine(
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

export const UserSchema = schema.omit({
  repeat_password: true,
  password: true
});

export type UserModel = z.infer<typeof UserSchema>;
export interface User extends UserModel {
  uid: string;
  created_at: Date;
}
