import { Router } from 'express';

import { fetch, post, get, del, patch } from '../helpers/requests';
import { authorization } from '../../Middleware';
import { Album } from '../../Database/Types';

const router = Router();

router.get('/', fetch('albums'));
router.get('/:id', get('albums'));

router.delete('/:id', authorization, del('albums'));

router.post('/', authorization, post<Album>('albums'));

router.patch('/:id', authorization, patch<Album>('albums'));

export default router;
