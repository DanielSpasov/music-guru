import { Router } from 'express';

import { create, fetch } from '../../Services/Artist';

const router = Router();

router.post('/', create);
router.get('/', fetch);

export default router;
