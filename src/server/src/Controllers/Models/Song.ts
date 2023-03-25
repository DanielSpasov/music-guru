import { HydratedDocument } from 'mongoose';
import { Router } from 'express';

import { ArtistModel, SongModel, ISong } from '../../Database/Schemas';
import { fetch, get, del, post, patch } from '../../Services/requests';
import { Song, SongSchema } from '../../Types/Song';
import { CustomError } from '../../Error/CustomError';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/', (req, res) => fetch<ISong>({ req, res, Model: SongModel }));

router.get('/:id', (req, res) => get<ISong>({ req, res, Model: SongModel }));

router.delete('/:id', authorization, (req, res) =>
  del<ISong>({ req, res, Model: SongModel })
);

router.post('/', authorization, (req, res) =>
  post<ISong>({
    req,
    res,
    Model: SongModel,
    ValidationSchema: SongSchema,
    preCreateFn: async (data: Song) => {
      const artist = await ArtistModel.findOne({ uid: data.artist });
      if (!artist) {
        throw new CustomError({ message: 'Artist not found.', code: 404 });
      }

      const featuredArtists = await ArtistModel.find({
        uid: { $in: data.features }
      });

      return {
        data: {
          artist: artist._id,
          features: featuredArtists.map(artist => artist._id)
        }
      };
    },
    postCreateFn: async (data: HydratedDocument<ISong>) => {
      const artist = await ArtistModel.findById(data.artist);
      if (!artist) {
        throw new CustomError({ message: 'Artist not found.', code: 404 });
      }

      const featuredArtists = await ArtistModel.find({
        _id: { $in: data.features }
      });

      await artist.add('songs', data._id);
      await Promise.all(featuredArtists.map(x => x.add('features', data._id)));
    }
  })
);

router.patch('/:id', authorization, (req, res) =>
  patch<ISong>({
    req,
    res,
    Model: SongModel,
    ValidationSchema: SongSchema,
    preUpdateFn: async (data: Song) => {
      const artist = await ArtistModel.findOne({ uid: data.artist });
      if (!artist) {
        throw new CustomError({ message: 'Artist not found.', code: 404 });
      }

      const features = await ArtistModel.find({ uid: { $in: data.features } });

      return {
        data: {
          artist: artist._id,
          features: features.map(x => x._id)
        }
      };
    }
  })
);

export default router;
