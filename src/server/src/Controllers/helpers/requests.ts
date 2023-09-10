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
import { Request, Response } from 'express';

import {
  createReferences,
  createRelations,
  removeRelations,
  updateRelations
} from './helpers';
import { generateUID, getUser } from '../../Utils';
import { errorHandler } from '../../Error';

// Database imports
import { validationSchemas } from '../../Database/Schemas';
import { converters } from '../../Database/Converters';
import { getRefs } from '../../Database/References';
import { Collection, Serializer } from '../../Database/Types';
import db from '../../Database';

export function fetch(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const serializer = req.query?.serializer as Serializer;
      const reference = collection(db, collectionName).withConverter(
        converters[collectionName](serializer)
      );
      const snapshot = await getDocs(reference);
      const list = await Promise.all(snapshot.docs.map(doc => doc.data()));
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
        converters[collectionName](serializer)
      );
      const snapshot = await getDoc(reference);
      res.status(200).json({ data: snapshot.data() });
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

      const refs = getRefs<T>(collectionName);
      const references = await createReferences<T>(refs, validatedData);

      const data = {
        ...validatedData,
        ...references,
        created_by: doc(db, 'users', user.uid)
      };

      const document = doc(db, collectionName, uid);

      await setDoc(document.withConverter(converters[collectionName]()), data);

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
        converters[collectionName]()
      );
      const snapshot = await getDoc(reference);
      if (snapshot.get('created_by').id !== user.uid) {
        res.status(401).json({ message: 'Permission denied.' });
      }

      const validationSchema = validationSchemas[collectionName];
      const validatedData = validationSchema.parse(req.body);

      const refs = getRefs<T>(collectionName);
      const references = await createReferences<T>(refs, validatedData);

      await updateDoc(reference, { ...validatedData, ...references });

      res.status(200).json({
        message: 'Success',
        data: { uid: req.params.id, name: validatedData.name }
      });

      // It's okay for the relations update to be after the return
      // since the user doesn't need it immediately
      const oldData = (await snapshot.data()) as DocumentData;
      await updateRelations<T>(refs, validatedData, oldData, reference);
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
