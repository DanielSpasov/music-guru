import { Router } from 'express';

import { post, fetch, get, patch } from '../../Services/Artist';
import authorization from '../../Middleware/authorization';

const router = Router();

router.post('/', authorization, post);
router.get('/', fetch);
router.get('/:id', get);
router.patch('/:id', authorization, patch);

export default router;
