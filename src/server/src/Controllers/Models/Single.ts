import { Router } from 'express';

import { fetch, get, del, post, patch } from '../../Services/requests';
import { ArtistModel, SingleModel } from '../../Database/Schemas';
import { ISingle, SingleSchema } from '../../Types/Single';
import { CustomError } from '../../Error/CustomError';
import { authorization } from '../../Middleware';

async function preCreateFn(data: any) {
  const artist = await ArtistModel.findOne({ uid: data?.artist?.uid });
  if (!artist) {
    throw new CustomError({ message: 'Artist not found.', code: 404 });
  }

  return { data: { artist: artist._id } };
}

async function postCreateFn(data: ISingle) {
  const artist = await ArtistModel.findById(data.artist);
  if (!artist) {
    throw new CustomError({ message: 'Artist not found.', code: 404 });
  }

  await artist.addSingle(data._id);
}

async function preUpdateFn(data: any) {
  const artist = await ArtistModel.findOne({ uid: data?.artist?.uid });
  if (!artist) {
    throw new CustomError({ message: 'Artist not found.', code: 404 });
  }

  return { data: { artist: artist._id } };
}

async function postUpdateFn(oldDoc: any, newDoc: any) {
  await oldDoc.populate('artist');
  await newDoc.populate('artist');
  if (oldDoc.artist.uid !== newDoc.artist.uid) {
    const oldArtist = await ArtistModel.findOne({ uid: oldDoc.artist.uid });
    if (oldArtist) oldArtist.removeSingle(newDoc._id);
    const newArtist = await ArtistModel.findOne({ uid: newDoc.artist.uid });
    if (newArtist) newArtist.addSingle(newDoc._id);
  }
}

const router = Router();

router.get('/', (req, res) => fetch<ISingle>({ req, res, Model: SingleModel }));
router.get('/:id', (req, res) =>
  get<ISingle>({ req, res, Model: SingleModel })
);
router.delete('/:id', authorization, (req, res) =>
  del<ISingle>({ req, res, Model: SingleModel })
);
router.post('/', authorization, (req, res) =>
  post<ISingle>({
    req,
    res,
    Model: SingleModel,
    ValidationSchema: SingleSchema,
    preCreateFn,
    postCreateFn
  })
);
router.patch('/:id', authorization, (req, res) =>
  patch({
    req,
    res,
    Model: SingleModel,
    ValidationSchema: SingleSchema,
    preUpdateFn,
    postUpdateFn
  })
);

export default router;
