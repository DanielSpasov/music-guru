import { Router } from 'express';

import { fetch, get, del, post, patch } from '../../Services/requests';
import { SongModel, ISong } from '../../Database/Models';
import { authorization } from '../../Middleware';
import { SongSchema } from '../../Types/Song';

const router = Router();

router.get('/', fetch('songs'));

router.get('/:id', get<ISong>({ Model: SongModel }));

router.delete('/:id', authorization, del<ISong>({ Model: SongModel }));

router.post(
  '/',
  authorization,
  post<ISong>({
    Model: SongModel,
    ValidationSchema: SongSchema,
    prepopulate: ['artist', 'features'],
    relations: [
      { key: 'artist', relation: ['songs'] },
      { key: 'features', relation: ['features'] }
    ]
  })
);

router.patch(
  '/:id',
  authorization,
  patch<ISong>({
    Model: SongModel,
    ValidationSchema: SongSchema,
    prepopulate: ['artist', 'features']
  })
);

export default router;
