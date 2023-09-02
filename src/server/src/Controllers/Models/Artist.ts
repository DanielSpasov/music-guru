import { Router } from 'express';

import { fetch, get, post, patch } from '../helpers/requests';
import { Artist, ArtistSchema } from '../../Types/Artist';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/', fetch('artists'));
router.get('/:id', get('artists'));

router.post(
  '/',
  authorization,
  post<Artist>({ collectionName: 'artists', validationSchema: ArtistSchema })
);

router.patch(
  '/:id',
  authorization,
  patch<Artist>({ collectionName: 'artists', validationSchema: ArtistSchema })
);

export default router;
