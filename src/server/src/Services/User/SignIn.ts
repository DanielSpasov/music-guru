import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import { UserModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import { CustomError } from '../../Error/CustomError';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export async function SignIn(req: Request, res: Response) {
  try {
    // VALIDATE WITH ZOD
    const { email, password } = UserSchema.parse({
      email: req.body?.email,
      password: req.body?.password
    });

    // CHECK IF THE EMAIL IS REGISTERED
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new CustomError({
        message: 'Wrong Email adress or Password.',
        code: 400
      });
    }

    // CHECK IF THE PASSWORD IS VALID
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      throw new CustomError({
        message: 'Wrong Email adress or Password.',
        code: 400
      });
    }

    // SIGN THE JSON WEB TOKEN
    const secret = process.env.JWT_SECRET || '';
    const token = jwt.sign({ uid: user.uid }, secret);

    res.status(200).json({ token, uid: user.uid });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
