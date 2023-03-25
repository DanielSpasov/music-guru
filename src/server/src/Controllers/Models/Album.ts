import { Router } from 'express';

import { AlbumModel, ArtistModel, IAlbum } from '../../Database/Schemas';
import { fetch, post, get, del, patch } from '../../Services/requests';
import { CustomError } from '../../Error/CustomError';
import { Album, AlbumSchema } from '../../Types/Album';
import { HydratedDocument } from 'mongoose';

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
    preCreateFn: async (data: IAlbum) => {
      const artist = await ArtistModel.findOne({ uid: data.artist });
      if (!artist) {
        throw new CustomError({ message: 'Artist not found.', code: 404 });
      }

      return {
        data: {
          artist: artist._id
        }
      };
    },
    postCreateFn: async (data: HydratedDocument<IAlbum>) => {
      const artist = await ArtistModel.findById(data.artist);
      if (!artist) {
        throw new CustomError({ message: 'Artist not found.', code: 404 });
      }

      await artist.add('albums', data._id);
    }
  })
);

router.patch('/:id', (req, res) =>
  patch({
    req,
    res,
    Model: AlbumModel,
    ValidationSchema: AlbumSchema,
    preUpdateFn: async (data: Album) => {
      const artist = await ArtistModel.findOne({ uid: data.artist });
      if (!artist) {
        throw new CustomError({ message: 'Artist not found.', code: 404 });
      }

      return { data: { artist: artist._id } };
    }
  })
);

export default router;
