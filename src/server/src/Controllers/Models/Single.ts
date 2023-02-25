import { HydratedDocument } from 'mongoose';
import { Router } from 'express';

import { ArtistModel, SingleModel, ISingle } from '../../Database/Schemas';
import { fetch, get, del, post, patch } from '../../Services/requests';
import { Single, SingleSchema } from '../../Types/Single';
import { CustomError } from '../../Error/CustomError';
import { authorization } from '../../Middleware';

const router = Router();

router.get('/', (req, res) => fetch<ISingle>({ req, res, Model: SingleModel }));

router.get('/:id', (req, res) =>
  get<ISingle>({ req, res, Model: SingleModel })
);

router.delete('/:id', authorization, (req, res) =>
  del<ISingle>({ req, res, Model: SingleModel })
);

router.post('/', authorization, (req, res) =>
  post<ISingle>({
    req,
    res,
    Model: SingleModel,
    ValidationSchema: SingleSchema,
    preCreateFn: async (data: Single) => {
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
    postCreateFn: async (data: HydratedDocument<ISingle>) => {
      const artist = await ArtistModel.findById(data.artist);
      if (!artist) {
        throw new CustomError({ message: 'Artist not found.', code: 404 });
      }

      const featuredArtists = await ArtistModel.find({
        _id: { $in: data.features }
      });

      await artist.add('singles', data._id);
      await Promise.all(featuredArtists.map(x => x.add('features', data._id)));
    }
  })
);

router.patch('/:id', authorization, (req, res) =>
  patch<ISingle>({
    req,
    res,
    Model: SingleModel,
    ValidationSchema: SingleSchema,
    preUpdateFn: async (data: Single) => {
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