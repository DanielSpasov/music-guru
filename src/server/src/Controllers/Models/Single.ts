import { Router } from 'express';

import authorization from '../../Middleware/authorization';
import { fetch, get, del } from '../../Services/requests';
import { SingleModel } from '../../Database/Schemas';
import { post, patch } from '../../Services/Single';
import { ISingle } from '../../Types/Single';

const router = Router();

router.get('/', (req, res) => fetch<ISingle>(req, res, SingleModel));
router.get('/:id', (req, res) => get<ISingle>(req, res, SingleModel));
router.delete('/:id', authorization, (req, res) =>
  del<ISingle>(req, res, SingleModel)
);
router.post('/', authorization, post);
router.patch('/:id', authorization, patch);

export default router;
