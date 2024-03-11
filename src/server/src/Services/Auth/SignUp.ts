import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { SignUpSchema } from '../../Database/Schemas';
import { sendVerificationEmail } from './helpers';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';
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
    const db = await connect();
    const collection = db.collection('users');
    const isUsed = await collection.findOne({ email });
    if (isUsed) {
      res.status(400).json({ message: 'This email is alredy signed up.' });
      return;
    }

    // HASHING THE PASSWORD
    const saltRounds = Number(env.SECURITY.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    // CREATE DATABASE ENTRY FOR THE USER
    const uid = crypto.randomUUID();
    const data = {
      uid,
      username,
      email,
      password: passwordHash,
      verified: false,
      created_at: new Date()
    };
    await collection.insertOne(data);

    // SIGN THE JSON WEB TOKEN
    const authToken = jwt.sign({ uid }, env.SECURITY.JWT_SECRET);

    await sendVerificationEmail(data);

    res.status(200).json({ token: authToken, uid });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
