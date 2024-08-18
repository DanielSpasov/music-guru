import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { SignUpSchema } from '../../Validations';
import { APIError } from '../../Error';
import User from '../../Schemas/User';
import SendEmail from '../Email';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const emailUsername = req.body?.email?.split('@')[0];
    const discriminator = Math.floor(1000 + Math.random() * 9000);
    const defaultUsername = `${emailUsername}${discriminator}`;

    // VALIDATE WITH ZOD
    const { email, username, password } = SignUpSchema.parse({
      username: req.body?.username || defaultUsername,
      email: req.body?.email,
      password: req.body?.password,
      repeat_password: req.body?.repeat_password
    });

    // CHECK IF THE EMAIL IS ALREADY SIGNED UP
    const isUsedEmail = await User.findOne({ email });
    if (isUsedEmail) throw new APIError(400, 'This email is alredy signed up.');

    // CHECK IF USERNAME IS USED
    const isUsedUsername = await User.findOne({ username });
    if (isUsedUsername) throw new APIError(400, 'This username is taken.');

    // HASHING THE PASSWORD
    const saltRounds = Number(process.env.SALT_ROUNDS);
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
      created_at: new Date(),
      favorites: {}
    };
    await User.create(data);

    // SIGN THE JSON WEB TOKEN
    const authToken = jwt.sign({ uid }, process.env.JWT_SECRET || '');

    const expToken = jwt.sign({ id: data.uid }, process.env.JWT_SECRET || '', {
      expiresIn: '10m'
    });

    await SendEmail({
      to: data.email,
      template: 'VERIFY',
      data: { expToken, username: data.username }
    });

    res.status(200).json({
      token: authToken,
      uid,
      data: {
        username: data.username,
        email: data.email,
        verified: data.verified,
        created_at: data.created_at,
        favorites: data.favorites,
        uid: data.uid
      }
    });
  } catch (err) {
    next(err);
  }
};
