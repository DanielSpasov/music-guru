import { Router } from 'express';

import { fetch, post, get, del, patch } from '../helpers/requests';
import { Album, AlbumSchema } from '../../Types/Album';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/', fetch('albums'));
router.get('/:id', get('albums'));

router.delete('/:id', authorization, del('albums'));

router.post(
  '/',
  authorization,
  post<Album>({
    collectionName: 'albums',
    validationSchema: AlbumSchema,
    references: [
      { key: 'artist', collection: 'artists' },
      { key: 'songs', collection: 'songs' }
    ],
    relations: [
      { key: 'artist', collection: 'artists', relationKey: 'albums' },
      { key: 'songs', collection: 'songs', relationKey: 'albums' }
    ]
  })
);

router.patch(
  '/:id',
  authorization,
  patch<Album>({
    collectionName: 'albums',
    validationSchema: AlbumSchema,
    references: [
      { key: 'artist', collection: 'artists' },
      { key: 'songs', collection: 'songs' }
    ]
  })
);

export default router;
