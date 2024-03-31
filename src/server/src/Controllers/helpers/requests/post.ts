import { getStorage, ref, uploadBytes } from 'firebase/storage';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import crypto from 'crypto';

import { FileUploadSchema, validationSchemas } from '../../../Database/Schemas';
import { errorHandler } from '../../../Error';
import { getUploadLinks } from '../helpers';
import { connect } from '../../../Database';
import { SimpleReqProps } from '../types';
import env from '../../../env';

export function post({ collectionName }: SimpleReqProps) {
  return async function (req: Request, res: Response) {
    try {
      const token = req.headers?.authorization;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
      }
      const { uid: userUID } = jwt.verify(
        token,
        env.SECURITY.JWT_SECRET
      ) as JwtPayload;
      const uid = crypto.randomUUID();

      const colName = collectionName;
      const validationSchema = validationSchemas[colName];
      const validatedData = validationSchema.parse(req.body);

      if (req?.files?.length) {
        const validatedFiles = FileUploadSchema.parse(req?.files);
        const name = validatedFiles[0].originalname;
        const fileExt = name.split('.')[name.split('.').length - 1];
        const imageRef = ref(
          getStorage(),
          `images/${collectionName}/${uid}.${fileExt}`
        );
        await uploadBytes(imageRef, validatedFiles[0].buffer);
      }

      const uploadedFiles = await getUploadLinks(
        req?.files as [],
        colName,
        uid
      );

      const db = await connect('models');
      const users = db.collection('users');
      const user = await users.findOne({ uid: userUID });
      if (!user) {
        res.status(400).json({ message: 'Invalid User UID.' });
        return;
      }

      const data = {
        ...validatedData,
        ...uploadedFiles,
        uid,
        created_by: userUID,
        created_at: new Date()
      };

      const collection = db.collection(collectionName);
      await collection.insertOne(data);

      res.status(200).json({ message: 'Success', uid, name: data.name });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
