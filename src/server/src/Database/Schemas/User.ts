import { z } from 'zod';

export const UsernameSchema = z.union([
  z.string().min(2, 'Username is too short.').max(30, 'Username is too long.'),
  z.literal('')
]);

export const EmailSchema = z.string().email({ message: 'Invalid email.' });

const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol');

export const BaseUserSchema = z.object({
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  repeat_password: PasswordSchema,
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

export const ChangePassSchema = z.object({
  current_password: PasswordSchema,
  new_password: PasswordSchema,
  confirm_new_password: PasswordSchema
});
