import { Router } from 'express';

import ArtistController from './Artist';
import AlbumController from './Album';
import SongController from './Song';
import UserController from './User';

const router = Router();

router.use('/artist', ArtistController);
router.use('/album', AlbumController);
router.use('/song', SongController);
router.use('/user', UserController);

export default router;
