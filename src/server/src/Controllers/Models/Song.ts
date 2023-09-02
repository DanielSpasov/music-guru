import { Router } from 'express';

import { fetch, get, del, post, patch } from '../helpers/requests';
import { SongSchema, Song } from '../../Types/Song';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/', fetch('songs'));
router.get('/:id', get('songs'));

router.delete('/:id', authorization, del('songs'));

router.post(
  '/',
  authorization,
  post<Song>({
    collectionName: 'songs',
    validationSchema: SongSchema,
    references: [
      { key: 'artist', collection: 'artists' },
      { key: 'features', collection: 'artists', type: 'arr' }
    ],
    relations: [
      { key: 'artist', collection: 'artists', relationKey: 'songs' },
      { key: 'features', collection: 'artists', relationKey: 'features' }
    ]
  })
);

router.patch(
  '/:id',
  authorization,
  patch<Song>({
    collectionName: 'songs',
    validationSchema: SongSchema,
    references: [
      { key: 'artist', collection: 'artists' },
      { key: 'features', collection: 'artists', type: 'arr' }
    ]
  })
);

export default router;
