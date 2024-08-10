import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from 'firebase/storage';
import { NextFunction, Request, Response } from 'express';

import { FileSchema } from '../../Validations';
import { connect } from '../../Database';
import { APIError } from '../../Error';
import { Models } from '../../Types';

export default ({ model }: { model: Exclude<Models, 'users'> }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const mongo = await connect();
    try {
      const db = mongo.db('models');
      const collection = db.collection(model);
      const item = await collection.findOne({ uid: req.params.id });
      if (!item) throw new APIError(400, 'Invalid UID.');

      if (req?.file) {
        const validatedFile = FileSchema.parse(req?.file);
        const name = validatedFile.originalname;
        const fileExt = name.split('.')[name.split('.').length - 1];

        const regex = /\/([^/]+\.([^/?#]+))(?:\?|$)/;
        const match = item.image.match(regex);
        if (!match) throw new APIError(400, 'Failed to update Image.');

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
        if (!updatedItem) throw new APIError(400, 'Failed to update Image.');

        res.status(200).json({
          image: updatedItem.image,
          message: 'Image updated successfully'
        });
        return;
      }

      throw new APIError(400, 'No image provided.');
    } catch (err) {
      next(err);
    } finally {
      await mongo.close();
    }
  };
