import { Router } from 'express';

import { Create } from '../../Services/Artist';

const router = Router();

router.post('/', Create);

export default router;
