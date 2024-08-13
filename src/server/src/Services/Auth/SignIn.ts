import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SignInSchema } from '../../Validations';
import { APIError } from '../../Error';
import User from '../../Schemas/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // VALIDATE WITH ZOD
    const { email, password } = SignInSchema.parse({
      email: req.body?.email,
      password: req.body?.password
    });

    // CHECK IF THE EMAIL IS REGISTERED
    const user = await User.findOne({ email });
    if (!user) throw new APIError(400, 'Wrong Email address or Password.');

    // CHECK IF THE PASSWORD IS VALID
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) throw new APIError(400, 'Wrong Email address or Password.');

    // SIGN THE JSON WEB TOKEN
    const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET || '');

    res.status(200).json({
      token,
      uid: user.uid,
      data: {
        username: user.username,
        email: user.email,
        verified: user.verified,
        created_at: user.created_at,
        favorites: user.favorites,
        uid: user.uid
      }
    });
  } catch (err) {
    next(err);
  }
};
