import { NextFunction, Request, Response } from 'express';

import { EditorSchema } from '../../Validations';
import { serializers } from '../../Serializers';
import { BaseModel, Model } from '../../Types';
import { APIError } from '../../Error';
import { schemas } from '../../Schemas';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = res.locals.item as BaseModel;
      const editorUID = EditorSchema.parse(req.body.userUID);

      const [data] = await schemas.users
        .aggregate()
        .match({ uid: editorUID })
        .project({ ...serializers.users?.list, _id: 0 });

      if (!data) {
        throw new APIError(404, 'User not found.');
      }

      if (item.editors.includes(editorUID)) {
        throw new APIError(400, 'User is already an editor.');
      }

      await schemas[model].updateOne(
        { uid: item.uid },
        { $push: { editors: editorUID } }
      );

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };
