import { Router } from 'express';

import UserController from './Models/User';
import ArtistController from './Models/Artist';

const router = Router();

router.use('/user', UserController);
router.use('/artist', ArtistController);

export default router;
