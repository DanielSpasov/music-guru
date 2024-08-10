import { deleteObject, getStorage, ref } from 'firebase/storage';
import { NextFunction, Request, Response } from 'express';

import { DBAlbum, DBSong } from '../../Types';
import { connect } from '../../Database';

export default async (req: Request, res: Response, next: NextFunction) => {
  const mongo = await connect();
  try {
    const db = mongo.db('models');

    const songsCollection = db.collection<DBSong>('songs');
    const albumsCollection = db.collection<DBAlbum>('albums');

    await albumsCollection.updateMany(
      { songs: { $in: [req.params.id] } },
      { $pull: { songs: req.params.id } }
    );

    const item = res.locals.item;

    if (item.image) {
      const fileExt = item?.image?.split(item.uid)[1].split('?')[0];
      const imageRef = ref(getStorage(), `images/songs/${item.uid}${fileExt}`);
      await deleteObject(imageRef);
    }

    await songsCollection.deleteOne({ uid: req.params.id });

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
