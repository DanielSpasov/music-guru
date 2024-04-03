import { Router } from 'express';

import { fetch, get, post, patch } from '../helpers/requests';
import { authorization, upload } from '../../Middleware';
import del from '../../Services/Songs/del';

const router = Router();

router.get('/', fetch({ databaseName: 'models', collectionName: 'songs' }));
router.get('/:id', get({ databaseName: 'models', collectionName: 'songs' }));

router.delete('/:id', authorization, del);

router.post(
  '/',
  [authorization, upload('image')],
  post({ collectionName: 'songs' })
);

router.patch('/:id', authorization, patch({ collectionName: 'songs' }));

export default router;
