import { deleteObject, getStorage, ref } from 'firebase/storage';
import { Request, Response } from 'express';
import { Collection } from 'mongodb';

import { DBAlbum } from '../../Database/Types';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection = db.collection('songs');
    const docs = collection.aggregate([{ $match: { uid: req.params.id } }]);
    const [item] = await docs.toArray();

    if (item?.created_by !== res.locals.userUID) {
      res.status(403).json({ message: 'Permission denied.' });
      return;
    }

    const albumsCollection: Collection<DBAlbum> = db.collection('albums');
    await albumsCollection.updateMany(
      { songs: { $in: [req.params.id] } },
      { $pull: { songs: req.params.id } }
    );

    if (item?.image) {
      const fileExt = item?.image?.split(item.uid)[1].split('?')[0];
      const imageRef = ref(getStorage(), `images/songs/${item.uid}${fileExt}`);
      await deleteObject(imageRef);
    }

    await collection.deleteOne({ uid: req.params.id });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    errorHandler(req, res, error);
  } finally {
    mongo.close();
  }
}
