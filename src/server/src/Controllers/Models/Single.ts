import { Router } from 'express';

import { post, del, patch } from '../../Services/Single';
import authorization from '../../Middleware/authorization';
import { SingleModel } from '../../Database/Schemas';
import { fetch, get } from '../../Services/requests';
import { ISingle } from '../../Types/Single';

const router = Router();

router.get('/', (req, res) => fetch<ISingle>(req, res, SingleModel));
router.get('/:id', (req, res) => get<ISingle>(req, res, SingleModel));
router.post('/', authorization, post);
router.patch('/:id', authorization, patch);
router.delete('/:id', del);

export default router;
