import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  documentId
} from 'firebase/firestore/lite';
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import crypto from 'crypto';

import { getList, getOp, getUploadLinks, QueryProps } from './helpers';
import { errorHandler } from '../../Error';
import env from '../../env';

// Database imports
import { FileUploadSchema, validationSchemas } from '../../Database/Schemas';
import { Collection, Serializer } from '../../Database/Types';
import { serializers } from '../../Database/Serializers';
import { converters } from '../../Database/Converters';
import db from '../../Database';

export function fetch(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const { serializer = 'list', ...restQuery }: QueryProps = req.query;

      const reference = collection(db, collectionName).withConverter(
        converters[collectionName]
      );

      const filters = Object.entries(restQuery).map(([name, value]) => {
        const [key, op] = name.split('__');
        const operator = getOp(op);
        return where(key === 'uid' ? documentId() : key, operator, value);
      });

      const list = getList(
        await getDocs(
          filters.length ? query(reference, ...filters) : reference
        ),
        collectionName,
        serializer
      );

      res.status(200).json({ data: list });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function get(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const serializer = req.query?.serializer as Serializer;
      const reference = doc(db, collectionName, req.params.id).withConverter(
        converters[collectionName]
      );
      const snapshot = await getDoc(reference);
      const data = snapshot.data();
      const serialized = await serializers?.[collectionName]?.[serializer]?.(
        data
      );
      res.status(200).json({ data: serialized || data });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function del(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const token = req.headers?.authorization;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
      }
      const { uid: userUID } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

      const reference = doc(db, collectionName, req.params.id);
      const snapshot = await getDoc(reference);

      if (snapshot.get('created_by') !== userUID) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      const image = snapshot.get('image');
      if (image) {
        const fileExt = image.split(snapshot.id)[1].split('?')[0];
        const imageRef = ref(
          getStorage(),
          `images/${collectionName}/${snapshot.id}${fileExt}`
        );
        await deleteObject(imageRef);
      }

      await deleteDoc(reference);

      res.status(200).json({ message: 'Success' });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function post(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const token = req.headers?.authorization;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
      }
      const { uid: userUID } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
      const uid = crypto.randomUUID();

      const validationSchema = validationSchemas[collectionName];
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
        collectionName,
        uid
      );

      const data = {
        ...validatedData,
        ...uploadedFiles,
        created_by: userUID
      };

      const document = doc(db, collectionName, uid);
      await setDoc(document.withConverter(converters[collectionName]), data);

      res.status(200).json({ message: 'Success', uid, name: data.name });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function patch(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const token = req.headers?.authorization;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
      }
      const { uid: userUID } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

      const reference = doc(db, collectionName, req.params.id).withConverter(
        converters[collectionName]
      );
      const snapshot = await getDoc(reference);
      if (snapshot.get('created_by') !== userUID) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      const validationSchema = validationSchemas[collectionName];
      const validatedData = validationSchema.parse(req.body);

      await updateDoc(reference, validatedData);

      res.status(200).json({
        message: 'Success',
        data: { uid: req.params.id, name: validatedData.name }
      });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
