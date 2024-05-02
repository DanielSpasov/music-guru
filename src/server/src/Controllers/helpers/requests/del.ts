import { deleteObject, getStorage, ref } from 'firebase/storage';
import { Request, Response } from 'express';

import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';
import { SimpleReqProps } from '../types';

export function del({ collectionName }: SimpleReqProps) {
  return async function (req: Request, res: Response) {
    const mongo = await connect();
    try {
      const db = mongo.db('models');
      const collection = db.collection(collectionName);
      const docs = collection.aggregate([{ $match: { uid: req.params.id } }]);
      const [item] = await docs.toArray();

      if (item?.created_by !== res.locals.userUID) {
        res.status(403).json({ message: 'Permission denied.' });
        return;
      }

      if (item?.image) {
        const fileExt = item?.image?.split(item.uid)[1].split('?')[0];
        const imageRef = ref(
          getStorage(),
          `images/${collectionName}/${item.uid}${fileExt}`
        );
        await deleteObject(imageRef);
      }

      await collection.deleteOne({ uid: req.params.id });

      res.status(200).json({ message: 'Success' });
    } catch (error) {
      errorHandler(req, res, error);
    } finally {
      mongo.close();
    }
  };
}
