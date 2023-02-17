import { Router } from 'express';

import { fetch, post, get } from '../../Services/Single';

const router = Router();

router.get('/', fetch);
router.post('/', post);
router.get('/:id', get);

export default router;
