import { Router } from 'express';

import {
  postVerse,
  delVerse,
  patchVerse,
  del,
  patch,
  addEditor,
  delEditor,
  fetchAvailable as fetchAvailableEditors
} from '../../Services/Songs';
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
router.delete('/:id/verse/:number', [authorization], delVerse);
router.patch('/:id/verse/:number', [authorization], patchVerse);

// Editors
router.get('/:id/editors/available', [authorization], fetchAvailableEditors);
router.post('/:id/editor', [authorization], addEditor);
router.delete('/:id/editor/:editor', [authorization], delEditor);

export default router;
