import { Router } from 'express';

import { create, fetch, get } from '../../Services/Artist';

const router = Router();

router.post('/', create);
router.get('/', fetch);
router.get('/:id', get);

export default router;
