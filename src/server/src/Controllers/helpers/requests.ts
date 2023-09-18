import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  DocumentData
} from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Request, Response } from 'express';

import {
  createReferences,
  createRelations,
  removeRelations,
  updateRelations,
  getUploadLinks
} from './helpers';
import { generateUID, getUser } from '../../Utils';
import { errorHandler } from '../../Error';

// Database imports
import { FileUploadSchema, validationSchemas } from '../../Database/Schemas';
import { Collection, Serializer } from '../../Database/Types';
import { serializers } from '../../Database/Serializers';
import { converters } from '../../Database/Converters';
import { getRefs } from '../../Database/References';
import db from '../../Database';

export function fetch(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const serializer = req.query?.serializer as Serializer;
      const reference = collection(db, collectionName).withConverter(
        converters[collectionName]
      );
      const snapshot = await getDocs(reference);
      const list = await Promise.all(
        snapshot.docs.map(doc => {
          const data = doc.data();
          const serialized =
            serializers?.[collectionName]?.[serializer]?.(data);
          return serialized || data;
        })
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

export function del<T>(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const reference = doc(db, collectionName, req.params.id);
      const snapshot = await getDoc(reference);

      const user = await getUser(req.headers?.authorization);

      if (snapshot.get('created_by').id !== user.uid) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      await removeRelations<T>(getRefs<T>(collectionName), reference);

      await deleteDoc(reference);

      res.status(200).json({ message: 'Success' });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function post<T>(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const user = await getUser(req.headers?.authorization);
      const uid = await generateUID(collectionName);

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

      const refs = getRefs<T>(collectionName);
      const references = await createReferences<T>(refs, validatedData);
      const uploadedFiles = await getUploadLinks(
        req?.files as [],
        collectionName,
        uid
      );

      const data = {
        ...validatedData,
        ...references,
        ...uploadedFiles,
        created_by: doc(db, 'users', user.uid)
      };

      const document = doc(db, collectionName, uid);

      await setDoc(document.withConverter(converters[collectionName]), data);

      await createRelations<T>(refs, validatedData, document);

      res.status(200).json({ message: 'Success', uid, name: data.name });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function patch<T>(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const user = await getUser(req.headers?.authorization);
      const reference = doc(db, collectionName, req.params.id).withConverter(
        converters[collectionName]
      );
      const snapshot = await getDoc(reference);
      if (snapshot.get('created_by').id !== user.uid) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      const validationSchema = validationSchemas[collectionName];
      const validatedData = validationSchema.parse(req.body);

      const refs = getRefs<T>(collectionName);
      const references = await createReferences<T>(refs, validatedData);

      await updateDoc(reference, { ...validatedData, ...references });

      const oldData = snapshot.data() as DocumentData;
      await updateRelations<T>(refs, validatedData, oldData, reference);

      res.status(200).json({
        message: 'Success',
        data: { uid: req.params.id, name: validatedData.name }
      });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
