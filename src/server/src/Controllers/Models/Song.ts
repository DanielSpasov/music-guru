import { Router } from 'express';

import { song, verses } from '../../Services/Songs';
import {
  authorization,
  ownership,
  upload,
  get,
  editorship
} from '../../Middleware';
import { fetch, post } from '../helpers/requests';
import { editors } from '../../Services/Editors';
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
router.get(
  '/:id',
  [get({ database: 'models', collection: 'songs' })],
  song.get
);
router.patch(
  '/:id',
  [get({ database: 'models', collection: 'songs' }), authorization, editorship],
  song.patch
);
router.delete(
  '/:id',
  [get({ database: 'models', collection: 'songs' }), authorization, ownership],
  song.del
);

router.post(
  '/:id/image',
  [
    upload('image'),
    get({ database: 'models', collection: 'songs' }),
    authorization,
    editorship
  ],
  updateImage({ model: 'songs' })
);

// Verses
router.post(
  '/:id/verse',
  [get({ database: 'models', collection: 'songs' }), authorization, editorship],
  verses.post
);
router.delete(
  '/:id/verse/:number',
  [get({ database: 'models', collection: 'songs' }), authorization, editorship],
  verses.del
);
router.patch(
  '/:id/verse/:number',
  [get({ database: 'models', collection: 'songs' }), authorization, editorship],
  verses.patch
);

// Editors
router.get(
  '/:id/editors/available',
  [get({ database: 'models', collection: 'songs' }), authorization, ownership],
  editors.fetch
);
router.post(
  '/:id/editor',
  [get({ database: 'models', collection: 'songs' }), authorization, ownership],
  editors.post
);
router.delete(
  '/:id/editor/:editor',
  [get({ database: 'models', collection: 'songs' }), authorization, ownership],
  editors.del
);

export default router;
