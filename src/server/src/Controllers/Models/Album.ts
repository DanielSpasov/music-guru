import { Router } from 'express';

import { AlbumModel, IAlbum } from '../../Database/Schemas';
import { fetch } from '../../Services/requests';

const router = Router();

router.get('/', (req, res) => fetch<IAlbum>({ req, res, Model: AlbumModel }));

export default router;
