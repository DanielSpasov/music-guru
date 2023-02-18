import { Router } from 'express';

import authorization from '../../Middleware/authorization';
import { fetch, post, get, del } from '../../Services/Single';

const router = Router();

router.get('/', fetch);
router.post('/', authorization, post);
router.get('/:id', get);
router.delete('/:id', del);

export default router;
