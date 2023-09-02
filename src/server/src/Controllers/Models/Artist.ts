import { Router } from 'express';

import { fetch, get, post, patch } from '../helpers/requests';
import { Artist } from '../../Database/Types/Artist';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/', fetch('artists'));
router.get('/:id', get('artists'));

router.post('/', authorization, post<Artist>('artists'));

router.patch('/:id', authorization, patch<Artist>('artists'));

export default router;
