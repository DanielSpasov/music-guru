import { Router } from 'express';
import multer from 'multer';

import { fetch, get, post, patch } from '../helpers/requests';
import { authorization } from '../../Middleware';
import { Artist } from '../../Database/Types';

const upload = <any>multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/', fetch('artists'));
router.get('/:id', get('artists'));

router.post('/', [authorization, upload.any('image')], post<Artist>('artists'));

router.patch('/:id', authorization, patch<Artist>('artists'));

export default router;
