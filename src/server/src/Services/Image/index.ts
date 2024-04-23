import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from 'firebase/storage';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { FileSchema } from '../../Database/Schemas';
import { ExtendedRequest } from '../../Database';
import { Models } from '../../Database/Types';
import { errorHandler } from '../../Error';
import env from '../../env';

export default function update({ model }: { model: Exclude<Models, 'users'> }) {
  return async function (request: Request, res: Response) {
    const req = request as ExtendedRequest;
    try {
      const db = req.mongo.db('models');
      const collection = db.collection(model);
      const item = await collection.findOne({ uid: req.params.id });
      if (!item) {
        res.status(400).json({ message: 'Invalid UID.' });
        return;
      }

      const token = req.headers?.authorization;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
      }

      const { uid: userUID } = jwt.verify(
        token,
        env.SECURITY.JWT_SECRET
      ) as JwtPayload;
      if (item.created_by !== userUID) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      if (req?.file) {
        const validatedFile = FileSchema.parse(req?.file);
        const name = validatedFile.originalname;
        const fileExt = name.split('.')[name.split('.').length - 1];

        const regex = /\/([^/]+\.([^/?#]+))(?:\?|$)/;
        const match = item.image.match(regex);
        if (!match) {
          res.status(400).json({ message: 'Failed to update Image.' });
          return;
        }

        const oldImageRef = ref(getStorage(), decodeURIComponent(match[1]));
        await deleteObject(oldImageRef);

        const imageRef = ref(
          getStorage(),
          `images/${model}/${req.params.id}.${fileExt}`
        );
        await uploadBytes(imageRef, validatedFile.buffer);
        const newImageURL = await getDownloadURL(imageRef);
        const updatedItem = await collection.findOneAndUpdate(
          { uid: req.params.id },
          { $set: { image: newImageURL } },
          { returnDocument: 'after' }
        );
        if (!updatedItem) {
          res.status(400).json({ message: 'Failed to update Image.' });
          return;
        }

        res.status(200).json({
          image: updatedItem.image,
          message: 'Image updated successfully'
        });
        return;
      }

      res.status(400).json({ message: 'No image provided.' });
    } catch (err) {
      errorHandler(req, res, err);
    }
  };
}
