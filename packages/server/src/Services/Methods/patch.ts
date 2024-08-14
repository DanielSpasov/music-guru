import { NextFunction, Request, Response } from 'express';

import { editValidationSchemas } from '../../Validations';
import { schemas } from '../../Schemas';
import { Model } from '../../Types';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [item] = await schemas[model]
        .aggregate()
        .match({ uid: req.params.id });

      const validationSchema = editValidationSchemas[model];
      const validatedData = validationSchema.parse(req.body);

      await schemas[model].findOneAndUpdate(
        { uid: req.params.id },
        {
          $set: {
            ...validatedData,
            image: item.image
          }
        },
        { upsert: true }
      );

      res.status(200).json({
        message: 'Success',
        data: { uid: req.params.id, name: validatedData.name }
      });
    } catch (err) {
      next(err);
    }
  };
