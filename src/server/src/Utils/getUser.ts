import { DocumentData, doc, getDoc } from 'firebase/firestore/lite';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { CustomError } from '../Error/CustomError';
import db from '../Database';
import env from '../env';

export default async function getUser(
  token: string | undefined
): Promise<DocumentData> {
  if (!token) {
    throw new CustomError({ message: 'Unauthorized.', code: 401 });
  }

  const { uid } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

  const reference = doc(db, 'users', uid);
  const snapshot = await getDoc(reference);
  const document = snapshot.data();

  if (!document) {
    throw new CustomError({ message: 'User not found.', code: 404 });
  }

  return { uid: snapshot.id, ...document };
}
