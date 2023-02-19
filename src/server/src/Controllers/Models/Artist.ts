import { Router } from 'express';

import authorization from '../../Middleware/authorization';
import { post, patch } from '../../Services/Artist';
import { ArtistModel } from '../../Database/Schemas';
import { fetch, get } from '../../Services/requests';
import { IArtist } from '../../Types/Artist';

const router = Router();

router.get('/', (req, res) => fetch<IArtist>(req, res, ArtistModel));
router.get('/:id', (req, res) => get<IArtist>(req, res, ArtistModel));
router.post('/', authorization, post);
router.patch('/:id', authorization, patch);

export default router;
