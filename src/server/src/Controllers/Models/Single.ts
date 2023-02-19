import { Router } from 'express';

import { fetch, post, get, del, patch } from '../../Services/Single';
import authorization from '../../Middleware/authorization';

const router = Router();

router.get('/', fetch);
router.post('/', authorization, post);
router.patch('/:id', authorization, patch);
router.get('/:id', get);
router.delete('/:id', del);

export default router;
