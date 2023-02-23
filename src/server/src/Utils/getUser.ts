import jwt, { JwtPayload } from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';

import { CustomError } from '../Error/CustomError';
import { UserModel } from '../Database/Schemas';
import { User } from '../Types/User';

export default async function getUser(
  token: string | undefined
): Promise<HydratedDocument<User>> {
  if (!token) {
    throw new CustomError({ message: 'Unauthorized.', code: 401 });
  }

  const secret = process.env.JWT_SECRET || '';
  const { uid: userUid } = jwt.verify(token, secret) as JwtPayload;
  const user = await UserModel.findOne({ uid: userUid });
  if (!user) {
    throw new CustomError({ message: 'User not found.', code: 404 });
  }

  return user;
}
