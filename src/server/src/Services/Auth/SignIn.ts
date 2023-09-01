import { query, collection, where, getDocs } from 'firebase/firestore/lite';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { CustomError } from '../../Error/CustomError';
import { SignInSchema } from '../../Types/User';
import { errorHandler } from '../../Error';
import db from '../../Database';
import env from '../../env';

export async function SignIn(req: Request, res: Response) {
  try {
    // VALIDATE WITH ZOD
    const { email, password } = SignInSchema.parse({
      email: req.body?.email,
      password: req.body?.password
    });

    // CHECK IF THE EMAIL IS REGISTERED
    const q = query(collection(db, 'users'), where('email', '==', email));
    const qSnap = await getDocs(q);
    if (qSnap.empty) {
      throw new CustomError({
        message: 'Wrong Email address or Password.',
        code: 400
      });
    }

    // CHECK IF THE PASSWORD IS VALID
    const passMatch = await bcrypt.compare(
      password,
      qSnap.docs[0].data().password
    );
    if (!passMatch) {
      throw new CustomError({
        message: 'Wrong Email address or Password.',
        code: 400
      });
    }

    // SIGN THE JSON WEB TOKEN
    const token = jwt.sign({ uid: qSnap.docs[0].id }, env.JWT_SECRET);

    res.status(200).json({ token, uid: qSnap.docs[0].id });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
