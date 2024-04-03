import { Router } from 'express';

import { fetch, post, get, del, patch } from '../helpers/requests';
import { authorization, upload } from '../../Middleware';

const router = Router();

router.get('/', fetch({ databaseName: 'models', collectionName: 'albums' }));
router.get(
  '/types',
  fetch({ databaseName: 'types', collectionName: 'albums' })
);

router.get('/:id', get({ databaseName: 'models', collectionName: 'albums' }));

router.delete('/:id', authorization, del({ collectionName: 'albums' }));

router.post(
  '/',
  [authorization, upload('image')],
  post({ collectionName: 'albums' })
);

router.patch('/:id', authorization, patch({ collectionName: 'albums' }));

export default router;
