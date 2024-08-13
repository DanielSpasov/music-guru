import { Router } from 'express';

import { methods, verses, favorite, updateImage, editors } from '../Services';
import {
  authorization,
  ownership,
  upload,
  get,
  editorship
} from '../Middlewares';

const router = Router();

// Songs
router.get('/', methods.fetch({ model: 'songs' }));
router.post(
  '/',
  [authorization, upload('image')],
  methods.post({ model: 'songs' })
);

// Song
router.get('/:id', methods.get({ model: 'songs' }));
router.patch(
  '/:id',
  [get({ model: 'songs' }), authorization, editorship],
  methods.patch({ model: 'songs' })
);
router.delete(
  '/:id',
  [get({ model: 'songs' }), authorization, ownership],
  methods.del({ model: 'songs' })
);

router.post(
  '/:id/image',
  [upload('image'), get({ model: 'songs' }), authorization, editorship],
  updateImage({ model: 'songs' })
);

router.post('/favorite', [authorization], favorite({ model: 'songs' }));

// Verses
router.post(
  '/:id/verse',
  [get({ model: 'songs' }), authorization, editorship],
  verses.post
);
router.delete(
  '/:id/verse/:number',
  [get({ model: 'songs' }), authorization, editorship],
  verses.del
);
router.patch(
  '/:id/verse/:number',
  [get({ model: 'songs' }), authorization, editorship],
  verses.patch
);

// Editors
router.post(
  '/:id/editor',
  [get({ model: 'songs' }), authorization, ownership],
  editors.post({ model: 'songs' })
);
router.delete(
  '/:id/editor/:editor',
  [get({ model: 'songs' }), authorization, ownership],
  editors.del({ model: 'songs' })
);

export default router;
