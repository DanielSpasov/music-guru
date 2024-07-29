import { Router } from 'express';

import { fetch, get, post } from '../helpers/requests';
import { authorization, upload } from '../../Middleware';
import favorite from '../../Services/Favorites';
import patch from '../../Services/Artists/patch';
import updateImage from '../../Services/Image';

const router = Router();

router.get('/', fetch({ databaseName: 'models', collectionName: 'artists' }));
router.get('/:id', get({ databaseName: 'models', collectionName: 'artists' }));

router.post(
  '/',
  [authorization, upload('image')],
  post({ collectionName: 'artists' })
);
router.post('/favorite', [authorization], favorite({ model: 'artists' }));
router.post(
  '/:id/image',
  [authorization, upload('image')],
  updateImage({ model: 'artists' })
);

router.patch('/:id', authorization, patch);

export default router;
