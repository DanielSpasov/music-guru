import { Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { z } from 'zod';

import { UserModel } from '../Database/Schemas';

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

export async function SignUp(req: Request, res: Response) {
  try {
    // VALIDATE WITH ZOD
    const { email, username, password } = UserSchema.parse({
      username: req.body?.username,
      email: req.body?.email,
      password: req.body?.password,
      repeatPassword: req.body?.repeatPassword
    });

    // CHECK IF THE EMAIL IS ALREADY SIGNED UP
    const usedEmail = await UserModel.findOne({ email });
    if (usedEmail) {
      res.status(400).json({ message: 'This email is alredy used.' });
      return;
    }

    // HASHING THE PASSWORD
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    // GENREATE UID
    const generateUID = async () => {
      const uid = crypto.randomBytes(4).toString('hex');
      const usedUID = await UserModel.findOne({ uid });
      if (!usedUID) return uid;
      generateUID();
    };
    const uid = await generateUID();

    // CREATE DATABASE ENTRY FOR THE USET
    const user = new UserModel({
      uid,
      username,
      email,
      password: passwordHash
    });
    await user.save();

    // SIGN THE JSON WEB TOKEN
    const jwtSecret = String(process.env.JWT_SECRET);
    const token = jwt.sign({ uid }, jwtSecret);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unexpected Server Error' });
  }
}

export function ValidateToken(req: Request, res: Response) {
  try {
    const token = req.query?.token?.toString() || '';
    if (!token) res.status(400).json({ message: 'No token was found.' });

    const secret = process.env.JWT_SECRET || '';
    const verifiedToken = jwt.verify(token, secret);

    res.status(200).json(verifiedToken);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      if (error.name === 'JsonWebTokenError') {
        res.status(400).json({ message: 'Invalid token' });
        return;
      }
      res.status(400).json({ message: 'JWT Error' });
      return;
    }
    res.status(500).json({ message: 'Unexpected Server Error' });
  }
}

export function Post(req: Request, res: Response) {
  res.status(200).json('POST');
}
