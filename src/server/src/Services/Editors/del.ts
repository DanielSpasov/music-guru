import { NextFunction, Request, Response } from 'express';

import { EditorSchema } from '../../Validations';
import { schemas } from '../../Schemas';
import { APIError } from '../../Error';
import User from '../../Schemas/User';
import { Model } from '../../Types';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = res.locals.item;
      const editorUID = EditorSchema.parse(req.params.editor);

      const editor = await User.findOne({ uid: editorUID });
      if (!editor) throw new APIError(404, 'User not found.');

      const editorUIDs = item.editors.map(x => x.uid);
      if (!editorUIDs.includes(editorUID)) {
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
