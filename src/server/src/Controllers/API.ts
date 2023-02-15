import { Router } from 'express';

import UserController from './Models/User';
import ArtistController from './Models/Artist';
import SingleController from './Models/Single';

const router = Router();

router.use('/user', UserController);
router.use('/artist', ArtistController);
router.use('/single', SingleController);

export default router;
