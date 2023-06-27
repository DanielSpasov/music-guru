import { Router } from 'express';

import { fetch, post, get, del, patch } from '../../Services/requests';
import { AlbumModel, IAlbum } from '../../Database/Schemas';
import { authorization } from '../../Middleware';
import { AlbumSchema } from '../../Types/Album';

const router = Router();

router.get('/', fetch<IAlbum>({ Model: AlbumModel }));

router.get('/:id', get<IAlbum>({ Model: AlbumModel }));

router.delete('/:id', authorization, del<IAlbum>({ Model: AlbumModel }));

router.post(
  '/',
  authorization,
  post<IAlbum>({
    Model: AlbumModel,
    ValidationSchema: AlbumSchema,
    prepopulate: ['artist'],
    relations: [{ key: 'artist', relation: ['albums'] }]
  })
);

router.patch(
  '/:id',
  authorization,
  patch<IAlbum>({
    Model: AlbumModel,
    ValidationSchema: AlbumSchema,
    prepopulate: ['artist']
  })
);

export default router;
