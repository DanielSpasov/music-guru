import { Router } from 'express';
import multer from 'multer';

import { fetch, post, get, del, patch } from '../helpers/requests';
import { authorization } from '../../Middleware';

const upload = <any>multer({ storage: multer.memoryStorage() });
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
  [authorization, upload.any('image')],
  post({ collectionName: 'albums' })
);

router.patch('/:id', authorization, patch({ collectionName: 'albums' }));

export default router;
