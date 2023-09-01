import { Router } from 'express';

import { fetch, post, get, del, patch } from '../helpers/requests';
import { AlbumModel, IAlbum } from '../../Database/Models';
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
    refereces: [
      { key: 'artist', collection: 'artists' },
      { key: 'songs', collection: 'songs', type: 'arr' }
    ]

    // relations: [
    //   { key: 'artist', relation: ['albums'] },
    //   { key: 'songs', relation: ['albums'] }
    // ]
  })
);

router.patch(
  '/:id',
  authorization,
  patch<IAlbum>({
    Model: AlbumModel,
    ValidationSchema: AlbumSchema,
    prepopulate: ['artist', 'songs']
  })
);

export default router;
