import { Request, Response } from 'express';
import { z } from 'zod';

const UserSchema = z
  .object({
    username: z.string().max(16).min(2),
    email: z.string().email(),
    password: z.string(),
    repeatPassword: z.string()
  })
  .superRefine(({ repeatPassword, password }, context) => {
    if (repeatPassword !== password) {
      context.addIssue({
        code: 'custom',
        message: "Passwords doesn't match."
      });
    }
  });

export function SignUp(req: Request, res: Response) {
  try {
    const user = UserSchema.parse({
      username: req.body?.username,
      email: req.body?.email,
      password: req.body?.password,
      repeatPassword: req.body?.repeatPassword
    });

    console.log(user);

    res.status(200).json({ message: 'Signing up' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unexpected Server Error' });
  }
}
