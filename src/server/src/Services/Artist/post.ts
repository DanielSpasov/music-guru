import { Request, Response } from 'express';
import crypto from 'crypto';

import { artistSchema } from '../../Types/Artist';
import { ArtistModel } from '../../Database/Schemas';
import { errorHandler } from '../../Error';
import getUser from '../../Utils/getUser';

export async function post(req: Request, res: Response) {
  try {
    // AUTHENTICATE
    const user = await getUser(req.headers?.authorization);

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
