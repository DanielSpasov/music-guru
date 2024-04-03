import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SignInSchema } from '../../Database/Schemas';
import { ExtendedRequest } from '../../Database';
import { errorHandler } from '../../Error';
import env from '../../env';

export async function SignIn(request: Request, res: Response) {
  const req = request as ExtendedRequest;
  try {
    // VALIDATE WITH ZOD
    const { email, password } = SignInSchema.parse({
      email: req.body?.email,
      password: req.body?.password
    });

    // CHECK IF THE EMAIL IS REGISTERED
    const db = req.mongo.db('models');
    const collection = db.collection('users');
    const user = await collection.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Wrong Email address or Password.' });
      return;
    }

    // CHECK IF THE PASSWORD IS VALID
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      res.status(400).json({ message: 'Wrong Email address or Password.' });
      return;
    }

    // SIGN THE JSON WEB TOKEN
    const token = jwt.sign({ uid: user.uid }, env.SECURITY.JWT_SECRET);

    res.status(200).json({ token, uid: user.uid });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
