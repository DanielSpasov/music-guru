import { Router } from 'express';

import { fetch, get, post, patch } from '../../Services/requests';
import { ArtistSchema, IArtist } from '../../Types/Artist';
import { ArtistModel } from '../../Database/Schemas';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/', (req, res) => fetch<IArtist>({ req, res, Model: ArtistModel }));
router.get('/:id', (req, res) =>
  get<IArtist>({ req, res, Model: ArtistModel })
);
router.post('/', authorization, (req, res) =>
  post<IArtist>({
    req,
    res,
    Model: ArtistModel,
    ValidationSchema: ArtistSchema
  })
);
router.patch('/:id', authorization, (req, res) =>
  patch<IArtist>({
    req,
    res,
    Model: ArtistModel,
    ValidationSchema: ArtistSchema
  })
);

export default router;
