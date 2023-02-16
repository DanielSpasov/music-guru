import { Router } from 'express';

import { post, fetch, get, patch } from '../../Services/Artist';

const router = Router();

router.post('/', post);
router.get('/', fetch);
router.get('/:id', get);
router.patch('/:id', patch);

export default router;
