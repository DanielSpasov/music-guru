import { Request, Response } from 'express';

import { ArtistModel, SingleModel } from '../../Database/Schemas';
import { Single, SingleSchema } from '../../Types/Single';
import { CustomError } from '../../Error/CustomError';
import { errorHandler } from '../../Error';
import getUser from '../../Utils/getUser';

export async function patch(req: Request, res: Response) {
  try {
    const user = await getUser(req.headers?.authorization);

    const singleDoc = await SingleModel.findOne({
      uid: req.params.id
    }).populate('created_by');
    const single = singleDoc as unknown as Single;
    if (!single) {
      throw new CustomError({ message: 'Single not found.', code: 404 });
    }

    if (single.created_by.uid !== user.uid) {
      res.status(401).json({ message: 'Permission denied.' });
      return;
    }

    const validData = SingleSchema.parse({
      name: req.body?.name,
      image: req.body?.image,
      artist: req.body?.artist
    });

    const artist = await ArtistModel.findOne({ uid: validData.artist.uid });
    if (!artist) {
      throw new CustomError({ message: 'Artist not found.', code: 404 });
    }

    const updated = await SingleModel.findOneAndUpdate(
      { uid: req.params.id },
      validData,
      { new: true }
    );

    // await artist.addSingle(single._id);

    res.status(200).json({ data: updated });
  } catch (error) {
    console.log(error);
    errorHandler(req, res, error);
  }
}
