import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore/lite';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SignUpSchema } from '../../Database/Schemas';
import { sendVerificationEmail } from './helpers';
import { errorHandler } from '../../Error';
import { generateUID } from '../../Utils';
import db from '../../Database';
import env from '../../env';

export async function SignUp(req: Request, res: Response) {
  try {
    // VALIDATE WITH ZOD
    const defaultUsername = req.body?.email?.split('@')[0];
    const { email, username, password } = SignUpSchema.parse({
      username: req.body?.username || defaultUsername,
      email: req.body?.email,
      password: req.body?.password,
      repeat_password: req.body?.repeat_password
    });

    // CHECK IF THE EMAIL IS ALREADY SIGNED UP
    const q = query(collection(db, 'users'), where('email', '==', email));
    const qSnap = await getDocs(q);
    if (!qSnap.empty) {
      res.status(400).json({ message: 'This email is alredy signed up.' });
      return;
    }

    // HASHING THE PASSWORD
    const saltRounds = Number(env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    // CREATE DATABASE ENTRY FOR THE USER
    const uid = await generateUID('users');
    const data = {
      username,
      email,
      password: passwordHash,
      verified: false,
      created_at: new Date()
    };

    await setDoc(doc(db, 'users', uid), data);

    // SIGN THE JSON WEB TOKEN
    const authToken = jwt.sign({ uid }, env.JWT_SECRET);

    await sendVerificationEmail({ uid, email });

    res.status(200).json({ token: authToken, uid });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
