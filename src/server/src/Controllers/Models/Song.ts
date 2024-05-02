import { Router } from 'express';

import { postVerse, delVerse, del, patch } from '../../Services/Songs';
import { authorization, upload } from '../../Middleware';
import { fetch, get, post } from '../helpers/requests';
import updateImage from '../../Services/Image';

const router = Router();

// Songs
router.get('/', fetch({ databaseName: 'models', collectionName: 'songs' }));
router.post(
  '/',
  [authorization, upload('image')],
  post({ collectionName: 'songs' })
);

// Song
router.get('/:id', get({ databaseName: 'models', collectionName: 'songs' }));
router.patch('/:id', authorization, patch);
router.delete('/:id', authorization, del);

router.post(
  '/:id/image',
  [authorization, upload('image')],
  updateImage({ model: 'songs' })
);

// Verses
router.post('/:id/verse', [authorization], postVerse);
router.delete('/:id/verse', [authorization], delVerse);

export default router;
