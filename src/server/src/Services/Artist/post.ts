import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import crypto from 'crypto';

import { ArtistModel, UserModel } from '../../Database/Schemas';
import { artistSchema } from '../../Validations/Artist';
import { CustomError } from '../../Error/CustomError';
import { errorHandler } from '../../Error';

export async function post(req: Request, res: Response) {
  try {
    // GET USER
    const token = req.headers?.authorization || '';
    if (!token) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const secret = process.env.JWT_SECRET || '';
    const { uid: userUid } = jwt.verify(token, secret) as JwtPayload;
    const user = await UserModel.findOne({ uid: userUid });
    if (!user) {
      throw new CustomError({ message: 'User not found.', code: 404 });
    }

    // VALIDATE FE DATA WITH ZOD
    const validData = artistSchema.parse({
      name: req.body?.name,
      image: req.body?.image
    });

    // GENERATE ARTIST UID
    const generateUID = async () => {
      const uid = crypto.randomBytes(4).toString('hex');
      const usedUID = await ArtistModel.findOne({ uid });
      if (!usedUID) return uid;
      generateUID();
    };
    const uid = await generateUID();

    // CREATE NEW ARTIST
    const artist = new ArtistModel({
      uid,
      name: validData.name,
      image: validData.image,
      created: Date.now(),
      created_by: user._id
    });
    await artist.save();

    res.status(200).json({ message: 'Success', uid, name: validData.name });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
