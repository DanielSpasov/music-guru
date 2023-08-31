import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { CustomError } from '../../Error/CustomError';
import { UserModel } from '../../Database/Models';
import { sendVerificationEmail } from './helpers';
import { SignUpSchema } from '../../Types/User';
import { errorHandler } from '../../Error';

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
      password: passwordHash,
      verified: false
    });
    await user.save();

    // SIGN THE JSON WEB TOKEN
    const jwtSecret = String(process.env.JWT_SECRET);
    const authToken = jwt.sign({ uid }, jwtSecret);

    await sendVerificationEmail(user);

    res.status(200).json({ token: authToken, uid });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
