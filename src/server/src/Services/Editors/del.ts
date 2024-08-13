import { NextFunction, Request, Response } from 'express';

import { EditorSchema } from '../../Validations';
import { BaseModel, Model } from '../../Types';
import { schemas } from '../../Schemas';
import { APIError } from '../../Error';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = res.locals.item as BaseModel;
      const editorUID = EditorSchema.parse(req.params.editor);

      const editor = await schemas.users.findOne({ uid: editorUID });
      if (!editor) throw new APIError(404, 'User not found.');

      if (!item.editors.includes(editorUID)) {
        throw new APIError(400, 'User is not an editor.');
      }

      await schemas[model].updateOne(
        { uid: req.params.id },
        { $pull: { editors: editorUID } }
      );

      res.status(200).json({ message: 'Editor removed.' });
    } catch (err) {
      next(err);
    }
  };
