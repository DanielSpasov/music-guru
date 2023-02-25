import { Router } from 'express';

import { AlbumModel, ArtistModel, IAlbum } from '../../Database/Schemas';
import { fetch, post, get, del } from '../../Services/requests';
import { CustomError } from '../../Error/CustomError';
import { AlbumSchema } from '../../Types/Album';

const router = Router();

router.get('/', (req, res) => fetch<IAlbum>({ req, res, Model: AlbumModel }));

router.get('/:id', (req, res) => get<IAlbum>({ req, res, Model: AlbumModel }));

router.delete('/:id', (req, res) =>
  del<IAlbum>({ req, res, Model: AlbumModel })
);

router.post('/', (req, res) =>
  post<IAlbum>({
    req,
    res,
    Model: AlbumModel,
    ValidationSchema: AlbumSchema,
    preCreateFn: async (data: any) => {
      const artist = await ArtistModel.findOne({ uid: data.artist });
      if (!artist) {
        throw new CustomError({ message: 'Artist not found.', code: 404 });
      }

      return {
        data: {
          artist: artist._id
        }
      };
    }
  })
);

export default router;
