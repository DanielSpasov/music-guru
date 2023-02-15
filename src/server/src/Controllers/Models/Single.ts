import { Router } from 'express';

import { fetch } from '../../Services/Single';

const router = Router();

router.get('/', fetch);

export default router;
