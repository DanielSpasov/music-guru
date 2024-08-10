import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

import { FileSchema, validationSchemas } from '../../../Database/Schemas';
import { APIError } from '../../../Error';
import { connect } from '../../../Database';
import { getUploadLink } from '../helpers';
import { SimpleReqProps } from '../types';

export const post =
  ({ collectionName }: SimpleReqProps) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const mongo = await connect();
    try {
      const uid = crypto.randomUUID();

      const colName = collectionName;
      const validationSchema = validationSchemas[colName];
      const validatedData = validationSchema.parse(req.body);

      if (req?.file) {
        const validatedFile = FileSchema.parse(req?.file);
        const name = validatedFile.originalname;
        const fileExt = name.split('.')[name.split('.').length - 1];
        const imageRef = ref(
          getStorage(),
          `images/${collectionName}/${uid}.${fileExt}`
        );
        await uploadBytes(imageRef, validatedFile.buffer);
      }

      const uploadedFile = await getUploadLink(req?.file, colName, uid);

      const db = mongo.db('models');
      const users = db.collection('users');
      const user = await users.findOne({ uid: res.locals.user.uid });
      if (!user) throw new APIError(400, 'Invalid User UID.');

      const data = {
        ...validatedData,
        ...(req?.file ? { [req.file.fieldname]: uploadedFile } : {}),
        uid,
        created_by: res.locals.user.uid,
        created_at: new Date()
      };

      const collection = db.collection(collectionName);
      await collection.insertOne(data);

      res.status(200).json({ message: 'Success', uid, name: data.name });
    } catch (err) {
      next(err);
    } finally {
      await mongo.close();
    }
  };
