import { Router } from 'express';

import { ArtistModel, SongModel, ISong } from '../../Database/Schemas';
import { fetch, get, del, post, patch } from '../../Services/requests';
import { CustomError } from '../../Error/CustomError';
import { authorization } from '../../Middleware';
import { SongSchema } from '../../Types/Song';

const router = Router();

router.get('/', fetch<ISong>({ Model: SongModel }));

router.get('/:id', get<ISong>({ Model: SongModel }));

router.delete('/:id', authorization, del<ISong>({ Model: SongModel }));

router.post(
  '/',
  authorization,
  post<ISong>({
    Model: SongModel,
    ValidationSchema: SongSchema,
    prepopulate: ['artist', 'features'],
    relations: [
      { key: 'artist', relation: ['songs'] },
      { key: 'features', relation: ['features'] }
    ]
  })
);

router.patch(
  '/:id',
  authorization,
  patch<ISong>({
    Model: SongModel,
    ValidationSchema: SongSchema,
    preUpdateFn: async (data: ISong) => {
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
