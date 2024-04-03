import { deleteObject, getStorage, ref } from 'firebase/storage';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { ExtendedRequest } from '../../../Database';
import { errorHandler } from '../../../Error';
import { SimpleReqProps } from '../types';
import env from '../../../env';

export function del({ collectionName }: SimpleReqProps) {
  return async function (request: Request, res: Response) {
    const req = request as ExtendedRequest;
    try {
      const token = req.headers?.authorization;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
      }
      const { uid: userUID } = jwt.verify(
        token,
        env.SECURITY.JWT_SECRET
      ) as JwtPayload;

      const db = req.mongo.db('models');
      const collection = db.collection(collectionName);
      const docs = collection.aggregate([{ $match: { uid: req.params.id } }]);
      const [item] = await docs.toArray();

      if (item?.created_by !== userUID) {
        res.status(401).json({ message: 'Permission denied.' });
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
    }
  };
}
