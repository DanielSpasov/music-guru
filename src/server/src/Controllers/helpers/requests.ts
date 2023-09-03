import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc
} from 'firebase/firestore/lite';
import { Request, Response } from 'express';

import { createReferences, createRelations } from './helpers';
import { generateUID, getUser } from '../../Utils';
import { errorHandler } from '../../Error';

// Database imports
import { validationSchemas } from '../../Database/Schemas';
import { converters } from '../../Database/Converters';
import { getRefs } from '../../Database/References';
import { Collection } from '../../Database/Types';
import db from '../../Database';

export function fetch(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const reference = collection(db, collectionName);
      const snapshot = await getDocs(reference);
      const list = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));

      res.status(200).json({ data: list });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function get(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const reference = doc(db, collectionName, req.params.id).withConverter(
        converters[collectionName]
      );
      const snapshot = await getDoc(reference);
      res.status(200).json({ data: await snapshot.data() });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function del(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const reference = doc(db, collectionName, req.params.id);
      const snapshot = await getDoc(reference);

      const user = await getUser(req.headers?.authorization);

      if (snapshot.get('created_by').id !== user.uid) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      await deleteDoc(doc(db, collectionName, snapshot.id));

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

      await setDoc(
        doc(db, collectionName, uid).withConverter(converters[collectionName]),
        data
      );

      await createRelations<T>(
        refs,
        validatedData,
        doc(db, collectionName, uid)
      );

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
      }

      const validationSchema = validationSchemas[collectionName];
      const validatedData = validationSchema.parse(req.body);

      const refs = getRefs<T>(collectionName);
      const references = await createReferences<T>(refs, validatedData);

      const data = {
        ...validatedData,
        ...references,
        created_by: doc(db, 'users', user.uid),
        created_at: snapshot.get('created_at')
      };

      await setDoc(reference.withConverter(converters[collectionName]), data, {
        merge: true
      });

      res.status(200).json({
        message: 'Success',
        data: { uid: req.params.id, name: validatedData.name }
      });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}
