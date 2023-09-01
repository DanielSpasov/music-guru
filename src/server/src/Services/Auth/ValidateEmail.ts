import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { Request, Response } from 'express';

import { CustomError } from '../../Error/CustomError';
import { errorHandler } from '../../Error';
import db from '../../Database';

export async function ValidateEmail(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const reference = doc(db, 'users', id);
    const snapshot = await getDoc(reference);
    if (!snapshot.exists()) {
      throw new CustomError({
        code: 400,
        message: 'Failed to validate Email.'
      });
    }

    await updateDoc(reference, { verified: true });

    res.status(200).json({ message: 'Email Verified.' });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
