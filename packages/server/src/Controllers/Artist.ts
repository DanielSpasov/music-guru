import { Router } from 'express';

import {
  authorization,
  editorship,
  get,
  ownership,
  upload
} from '../Middlewares';
import { methods, favorite, updateImage, editors } from '../Services';

const router = Router();

router.get('/', methods.fetch({ model: 'artists' }));

router.get('/:id', methods.get({ model: 'artists' }));

router.post(
  '/',
  [authorization, upload('image')],
  methods.post({ model: 'artists' })
);
router.post('/favorite', [authorization], favorite({ model: 'artists' }));
router.post(
  '/:id/image',
  [get({ model: 'artists' }), authorization, editorship, upload('image')],
  updateImage({ model: 'artists' })
);

router.patch(
  '/:id',
  [get({ model: 'artists' }), authorization, editorship],
  methods.patch({ model: 'artists' })
);

// Editors
router.post(
  '/:id/editor',
  [get({ model: 'artists' }), authorization, ownership],
  editors.post({ model: 'artists' })
);
router.patch(
  '/:id/editor',
  [get({ model: 'artists' }), authorization, ownership],
  editors.patch({ model: 'artists' })
);

export default router;
