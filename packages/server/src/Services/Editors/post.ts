import { NextFunction, Request, Response } from 'express';

import { EditorsSchema } from '../../Validations';
import { BaseModel, Model } from '../../Types';
import { schemas } from '../../Schemas';
import { APIError } from '../../Error';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const editorsUids = EditorsSchema.parse(req.body.editorsUids);

      const editors = await schemas.users
        .find({ uid: { $in: editorsUids } }, { uid: 1 })
        .lean()
        .distinct('uid');

      const nonExistingUIDs = editorsUids.filter(uid => !editors.includes(uid));
      if (nonExistingUIDs.length > 0) {
        throw new APIError(
          404,
          `Users not found: ${nonExistingUIDs.join(', ')}.`
        );
      }

      const item = res.locals.item as BaseModel;
      const alreadyEditors = editorsUids.filter(uid =>
        item.editors.includes(uid)
      );
      if (alreadyEditors.length > 0) {
        throw new APIError(
          400,
          `Users are already editors: ${alreadyEditors.join(', ')}.`
        );
      }

      await schemas[model].updateOne(
        { uid: item.uid },
        { $addToSet: { editors: { $each: editorsUids } } }
      );

      res.status(200).json({ message: 'Editors added.' });
    } catch (err) {
      next(err);
    }
  };
