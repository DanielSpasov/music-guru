import { Router } from 'express';

import { fetch, get, post, patch } from '../helpers/requests';
import { authorization, upload } from '../../Middleware';

const router = Router();

router.get('/', fetch({ databaseName: 'models', collectionName: 'artists' }));
router.get('/:id', get({ databaseName: 'models', collectionName: 'artists' }));

router.post(
  '/',
  [authorization, upload('image')],
  post({ collectionName: 'artists' })
);

router.patch('/:id', authorization, patch({ collectionName: 'artists' }));

export default router;
