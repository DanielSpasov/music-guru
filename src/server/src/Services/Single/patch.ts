import { Request, Response } from 'express';

import { ArtistModel, SingleModel } from '../../Database/Schemas';
import { CustomError } from '../../Error/CustomError';
import { SingleSchema } from '../../Types/Single';
import { errorHandler } from '../../Error';
import getUser from '../../Utils/getUser';

export async function patch(req: Request, res: Response) {
  try {
    const user = await getUser(req.headers?.authorization);

    const singleDoc = await SingleModel.findOne({
      uid: req.params.id
    })
      .populate('created_by')
      .populate('artist');
    const single = singleDoc as any;
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

    const newArtist = await ArtistModel.findOne({ uid: validData.artist.uid });
    const oldArtist = await ArtistModel.findOne({ uid: single.artist.uid });
    if (!newArtist || !oldArtist) {
      throw new CustomError({ message: 'Artist not found.', code: 404 });
    }

    const updated = await SingleModel.findOneAndUpdate(
      { uid: req.params.id },
      {
        ...validData,
        artist: newArtist._id
      },
      { new: true }
    );

    if (oldArtist.uid !== newArtist.uid) {
      await oldArtist.removeSingle(single._id);
      await newArtist.addSingle(single._id);
    }

    res.status(200).json({ data: updated });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
