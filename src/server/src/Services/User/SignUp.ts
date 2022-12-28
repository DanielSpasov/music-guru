import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { z } from 'zod';

import { UserModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import { CustomError } from '../../Error/CustomError';

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
      throw new CustomError({
        message: 'This email is alredy signed up.',
        code: 400
      });
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

    // CREATE DATABASE ENTRY FOR THE USER
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

    res.status(200).json({ token, uid });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
