import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Request, Response } from 'express';
import crypto from 'crypto';

import { FileSchema, validationSchemas } from '../../../Database/Schemas';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';
import { getUploadLink } from '../helpers';
import { SimpleReqProps } from '../types';

export function post({ collectionName }: SimpleReqProps) {
  return async function (req: Request, res: Response) {
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
      if (!user) {
        res.status(400).json({ message: 'Invalid User UID.' });
        return;
      }

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
    } catch (error) {
      errorHandler(req, res, error);
    } finally {
      mongo.close();
    }
  };
}
