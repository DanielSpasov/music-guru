import { Router } from 'express';

import { fetch, get, post, patch } from '../../Services/requests';
import { ArtistModel, IArtist } from '../../Database/Models';
import { ArtistSchema } from '../../Types/Artist';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/', fetch<IArtist>({ Model: ArtistModel }));

router.get('/:id', get<IArtist>({ Model: ArtistModel }));

router.post(
  '/',
  authorization,
  post<IArtist>({
    Model: ArtistModel,
    ValidationSchema: ArtistSchema
  })
);

router.patch(
  '/:id',
  authorization,
  patch<IArtist>({
    Model: ArtistModel,
    ValidationSchema: ArtistSchema
  })
);

export default router;
