import { Router } from 'express';

import authorization from '../../Middleware/authorization';
import { patch } from '../../Services/Artist';
import { ArtistModel } from '../../Database/Schemas';
import { fetch, get, post } from '../../Services/requests';
import { ArtistSchema, IArtist } from '../../Types/Artist';

const router = Router();

router.get('/', (req, res) => fetch<IArtist>(req, res, ArtistModel));
router.get('/:id', (req, res) => get<IArtist>(req, res, ArtistModel));
router.post('/', authorization, (req, res) =>
  post<IArtist>({
    req,
    res,
    Model: ArtistModel,
    ValidationSchema: ArtistSchema
  })
);
router.patch('/:id', authorization, patch);

export default router;
