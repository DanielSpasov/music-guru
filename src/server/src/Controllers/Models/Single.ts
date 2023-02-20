import { Router } from 'express';

import { ArtistModel, SingleModel } from '../../Database/Schemas';
import { fetch, get, del, post } from '../../Services/requests';
import { ISingle, SingleSchema } from '../../Types/Single';
import { CustomError } from '../../Error/CustomError';
import { authorization } from '../../Middleware';
import { patch } from '../../Services/Single';

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
router.patch('/:id', authorization, patch);

export default router;
