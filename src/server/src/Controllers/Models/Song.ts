import { Router } from 'express';
import multer from 'multer';

import { fetch, get, del, post, patch } from '../helpers/requests';
import { authorization } from '../../Middleware';
import { Song } from '../../Database/Types';

const upload = <any>multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/', fetch('songs'));
router.get('/:id', get('songs'));

router.delete('/:id', authorization, del('songs'));

router.post('/', [authorization, upload.any('image')], post('songs'));

router.patch('/:id', authorization, patch<Song>('songs'));

export default router;
