import { Request, Response } from 'express';
import crypto from 'crypto';

import { ArtistModel, SingleModel } from '../../Database/Schemas';
import { singleSchema } from '../../Validations/Single';
import { CustomError } from '../../Error/CustomError';
import { errorHandler } from '../../Error';
import getUser from '../../Utils/getUser';

export async function post(req: Request, res: Response) {
  try {
    // AUTHENTICATE
    const user = await getUser(req.headers?.authorization);

    // VALIDATE FE DATA WITH ZOD
    const validData = singleSchema.parse({
      name: req.body?.name,
      image: req.body?.image,
      artist: req.body?.artist
    });

    // CHECK IF THE ARTIST IS VALID
    const artist = await ArtistModel.findOne({ uid: validData.artist.uid });
    if (!artist) {
      throw new CustomError({ message: 'Artist not found.', code: 404 });
    }

    // GENERATE SINGLE UID
    const generateUID = async () => {
      const uid = crypto.randomBytes(4).toString('hex');
      const usedUID = await SingleModel.findOne({ uid });
      if (!usedUID) return uid;
      generateUID();
    };
    const uid = await generateUID();

    // CREATE NEW SINGLE
    const single = new SingleModel({
      uid,
      name: validData.name,
      image: validData.image,
      artist: artist._id,
      album: null,
      mixtape: null,
      created: Date.now(),
      created_by: user._id
    });
    await single.save();

    // RELATE THE SINGLE TO THE ARTIST
    await artist.addSingle(single._id);

    res.status(200).json({ message: 'Success', uid, name: validData.name });
  } catch (error) {
    console.log(error);
    errorHandler(req, res, error);
  }
}
