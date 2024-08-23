import { Router } from 'express';

import { methods, updateImage, favorite, editors, albums } from '../Services';
import {
  authorization,
  editorship,
  get,
  ownership,
  upload
} from '../Middlewares';

const router = Router();

router.get('/', methods.fetch({ model: 'albums' }));

router.get('/types', methods.fetch({ model: 'album_types' }));

router.get('/:id', methods.get({ model: 'albums' }));

router.delete(
  '/:id',
  [get({ model: 'albums' }), authorization, ownership],
  methods.del({ model: 'albums' })
);

router.post(
  '/',
  [authorization, upload('image')],
  methods.post({ model: 'albums' })
);
router.post('/favorite', [authorization], favorite({ model: 'albums' }));
router.post(
  '/:id/image',
  [get({ model: 'albums' }), authorization, editorship, upload('image')],
  updateImage({ model: 'albums' })
);

router.patch(
  '/:id',
  [get({ model: 'albums' }), authorization, editorship],
  methods.patch({ model: 'albums' })
);

// Discs
router.delete(
  '/:id/disc/:number',
  [get({ model: 'albums' }), authorization, editorship],
  albums.discs.del
);

// Songs
router.get(
  '/:id/song',
  [get({ model: 'albums' }), authorization, editorship],
  albums.songs.fetch
);
router.post(
  '/:id/song',
  [get({ model: 'albums' }), authorization, editorship],
  albums.songs.post
);
router.patch(
  '/:id/song',
  [get({ model: 'albums' }), authorization, editorship],
  albums.songs.patch
);
router.put(
  '/:id/song',
  [get({ model: 'albums' }), authorization, editorship],
  albums.songs.put
);

// Editors
router.post(
  '/:id/editor',
  [get({ model: 'albums' }), authorization, ownership],
  editors.post({ model: 'albums' })
);
router.patch(
  '/:id/editor',
  [get({ model: 'albums' }), authorization, ownership],
  editors.patch({ model: 'albums' })
);

export default router;
