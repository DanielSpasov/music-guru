import { Router } from 'express';

import { fetch, get, del, post, patch } from '../helpers/requests';
import { SongModel, ISong } from '../../Database/Models';
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
    defaultData: { albums: [], features: [] },
    refereces: [
      { key: 'artist', collection: 'artists' },
      { key: 'features', collection: 'artists', type: 'arr' }
    ]

    // relations: [
    //   { key: 'artist', relation: ['songs'] },
    //   { key: 'features', relation: ['features'] }
    // ]
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
