import { Router } from 'express';

import UserController from './Models/User';
import ArtistController from './Models/Artist';
import SongController from './Models/Song';
import AlbumController from './Models/Album';

const router = Router();

router.use('/user', UserController);
router.use('/artist', ArtistController);
router.use('/song', SongController);
router.use('/album', AlbumController);

export default router;
