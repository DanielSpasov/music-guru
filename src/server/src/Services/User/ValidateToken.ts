import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response } from 'express';

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
