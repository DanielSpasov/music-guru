import { Router } from 'express';

import { fetch, get, post, patch } from '../helpers/requests';
import { authorization } from '../../Middleware';
import { Artist } from '../../Database/Types';

const router = Router();

router.get('/', fetch('artists'));
router.get('/:id', get('artists'));

router.post('/', authorization, post<Artist>('artists'));

router.patch('/:id', authorization, patch<Artist>('artists'));

export default router;
