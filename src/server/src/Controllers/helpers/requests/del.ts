import { deleteObject, getStorage, ref } from 'firebase/storage';
import { NextFunction, Request, Response } from 'express';

import { connect } from '../../../Database';
import { APIError } from '../../../Error';
import { SimpleReqProps } from '../types';

export const del =
  ({ collectionName }: SimpleReqProps) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const mongo = await connect();
    try {
      const db = mongo.db('models');
      const collection = db.collection(collectionName);
      const docs = collection.aggregate([{ $match: { uid: req.params.id } }]);
      const [item] = await docs.toArray();

      if (item?.created_by !== res.locals.user.uid) {
        throw new APIError(403, 'Permission denied.');
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
    } catch (err) {
      next(err);
    } finally {
      await mongo.close();
    }
  };
