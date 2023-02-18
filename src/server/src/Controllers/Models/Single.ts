import { Router } from 'express';

import { fetch, post, get, del } from '../../Services/Single';
import authorization from '../../Middleware/authorization';

const router = Router();

router.get('/', fetch);
router.post('/', authorization, post);
router.get('/:id', get);
router.delete('/:id', del);

export default router;
