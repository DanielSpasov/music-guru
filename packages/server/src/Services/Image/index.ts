import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from 'firebase/storage';
import { NextFunction, Request, Response } from 'express';

import { FileSchema } from '../../Validations';
import { BaseModel, Model } from '../../Types';
import { schemas } from '../../Schemas';
import { APIError } from '../../Error';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [item] = await schemas[model]
        .aggregate()
        .match({ uid: req.params.id });

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
        const updatedItem = await schemas[model].findOneAndUpdate<BaseModel>(
          { uid: req.params.id },
          { $set: { image: newImageURL } },
          { returnDocument: 'after' }
        );
        if (!updatedItem) throw new APIError(400, 'Failed to update Image.');

        return res.status(200).json({
          image: updatedItem.image,
          message: 'Image updated successfully'
        });
      }

      throw new APIError(400, 'No image provided.');
    } catch (err) {
      next(err);
    }
  };
