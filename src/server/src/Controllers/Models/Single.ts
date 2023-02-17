import { Router } from 'express';

import authorization from '../../Middleware/authorization';
import { fetch, post, get } from '../../Services/Single';

const router = Router();

router.get('/', fetch);
router.post('/', authorization, post);
router.get('/:id', get);

export default router;
