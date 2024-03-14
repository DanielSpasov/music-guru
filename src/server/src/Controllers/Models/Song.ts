import { Router } from 'express';
import multer from 'multer';

import { fetch, get, del, post, patch } from '../helpers/requests';
import { authorization } from '../../Middleware';

const upload = <any>multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/', fetch({ databaseName: 'models', collectionName: 'songs' }));
router.get('/:id', get({ databaseName: 'models', collectionName: 'songs' }));

router.delete('/:id', authorization, del({ collectionName: 'songs' }));

router.post(
  '/',
  [authorization, upload.any('image')],
  post({ collectionName: 'songs' })
);

router.patch('/:id', authorization, patch({ collectionName: 'songs' }));

export default router;
