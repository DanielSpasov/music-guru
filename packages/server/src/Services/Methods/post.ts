import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

import { FileSchema, validationSchemas } from '../../Validations';
import { getUploadLink } from '../../Utils';
import { schemas } from '../../Schemas';
import { Model } from '../../Types';

export default ({ model }: { model: Model }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationSchema = validationSchemas[model];
      const validatedData = validationSchema.parse(req.body);

      const uid = crypto.randomUUID();

      if (req?.file) {
        const validatedFile = FileSchema.parse(req?.file);
        const name = validatedFile.originalname;
        const fileExt = name.split('.')[name.split('.').length - 1];
        const imageRef = ref(getStorage(), `images/${model}/${uid}.${fileExt}`);
        await uploadBytes(imageRef, validatedFile.buffer);
      }

      const uploadedFile = await getUploadLink(req?.file, model, uid);

      const data = new schemas[model]({
        ...validatedData,
        ...(req?.file ? { [req.file.fieldname]: uploadedFile } : {}),
        uid,
        created_by: res.locals.user.uid,
        created_at: new Date()
      });
      await data.save();

      res.status(201).json({ data });
    } catch (err) {
      next(err);
    }
  };
