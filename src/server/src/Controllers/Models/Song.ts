import { Router } from 'express';

import { fetch, get, del, post, patch } from '../helpers/requests';
import { Song } from '../../Database/Types/Song';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/', fetch('songs'));
router.get('/:id', get('songs'));

router.delete('/:id', authorization, del('songs'));

router.post('/', authorization, post<Song>('songs'));

router.patch('/:id', authorization, patch<Song>('songs'));

export default router;
