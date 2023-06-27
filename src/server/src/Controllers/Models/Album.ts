import { Router } from 'express';

import { AlbumModel, ArtistModel, IAlbum } from '../../Database/Schemas';
import { fetch, post, get, del, patch } from '../../Services/requests';
import { CustomError } from '../../Error/CustomError';
import { AlbumSchema } from '../../Types/Album';

const router = Router();

router.get('/', fetch<IAlbum>({ Model: AlbumModel }));

router.get('/:id', get<IAlbum>({ Model: AlbumModel }));

router.delete('/:id', del<IAlbum>({ Model: AlbumModel }));

router.post(
  '/',
  post<IAlbum>({
    Model: AlbumModel,
    ValidationSchema: AlbumSchema,
    prepopulate: ['artist'],
    relations: [{ key: 'artist', relation: ['albums'] }]
  })
);

router.patch(
  '/:id',
  patch<IAlbum>({
    Model: AlbumModel,
    ValidationSchema: AlbumSchema,
    preUpdateFn: async (data: IAlbum) => {
      const artist = await ArtistModel.findOne({ uid: data.artist });
      if (!artist) {
        throw new CustomError({ message: 'Artist not found.', code: 404 });
      }

      return { data: { artist: artist._id } };
    }
  })
);

export default router;
