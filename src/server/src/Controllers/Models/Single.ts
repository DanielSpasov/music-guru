import { Router } from 'express';

import { fetch, post } from '../../Services/Single';

const router = Router();

router.get('/', fetch);
router.post('/', post);

export default router;
