import { Router } from 'express';

import { fetch, post, get, del, patch } from '../../Services/requests';
import { AlbumModel, IAlbum } from '../../Database/Models';
import { authorization } from '../../Middleware';
import { AlbumSchema } from '../../Types/Album';

const router = Router();

router.get('/', fetch('albums'));

router.get('/:id', get<IAlbum>({ Model: AlbumModel }));

router.delete('/:id', authorization, del<IAlbum>({ Model: AlbumModel }));

router.post(
  '/',
  authorization,
  post<IAlbum>({
    Model: AlbumModel,
    ValidationSchema: AlbumSchema,
    prepopulate: ['artist', 'songs'],
    relations: [
      { key: 'artist', relation: ['albums'] },
      { key: 'songs', relation: ['albums'] }
    ]
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
