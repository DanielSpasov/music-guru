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

      return { data: { artist: artist._id } };
    },
    postUpdateFn: async (
      oldDoc: HydratedDocument<ISingle & Single>,
      newDoc: HydratedDocument<ISingle & Single>
    ) => {
      await oldDoc.populate('artist');
      await newDoc.populate('artist');
      if (oldDoc.artist.uid !== newDoc.artist.uid) {
        const oldArtist = await ArtistModel.findOne({ uid: oldDoc.artist.uid });
        if (oldArtist) oldArtist.del('singles', newDoc._id);
        const newArtist = await ArtistModel.findOne({ uid: newDoc.artist.uid });
        if (newArtist) newArtist.add('singles', newDoc._id);
      }
    }
  })
);

export default router;
