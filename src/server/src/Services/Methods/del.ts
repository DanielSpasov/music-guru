import { deleteObject, getStorage, ref } from 'firebase/storage';
import { NextFunction, Request, Response } from 'express';

import { schemas } from '../../Schemas';
import { APIError } from '../../Error';
import { Model } from '../../Types';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [item] = await schemas[model]
        .aggregate()
        .match({ uid: req.params.id });

      if (item?.created_by !== res.locals.user.uid) {
        throw new APIError(403, 'Permission denied.');
      }

      if (item?.image) {
        const fileExt = item?.image?.split(item.uid)[1].split('?')[0];
        const imageRef = ref(
          getStorage(),
          `images/${model}/${item.uid}${fileExt}`
        );
        await deleteObject(imageRef);
      }

      await schemas[model].findOneAndDelete({ uid: req.params.id });

      res.status(200).json({ message: 'Success' });
    } catch (err) {
      next(err);
    }
  };
