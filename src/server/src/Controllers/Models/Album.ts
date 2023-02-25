import { Router } from 'express';

import { AlbumModel, ArtistModel, IAlbum } from '../../Database/Schemas';
import { AlbumSchema } from '../../Types/Album';
import { fetch, post } from '../../Services/requests';
import { CustomError } from '../../Error/CustomError';

const router = Router();

router.get('/', (req, res) => fetch<IAlbum>({ req, res, Model: AlbumModel }));

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
