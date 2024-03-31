import { Router } from 'express';
import multer from 'multer';

import { fetch, get, post, patch } from '../helpers/requests';
import { authorization } from '../../Middleware';

const upload = <any>multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/', fetch({ databaseName: 'models', collectionName: 'artists' }));
router.get('/:id', get({ databaseName: 'models', collectionName: 'artists' }));

router.post(
  '/',
  [authorization, upload.any('image')],
  post({ collectionName: 'artists' })
);

router.patch('/:id', authorization, patch({ collectionName: 'artists' }));

export default router;
