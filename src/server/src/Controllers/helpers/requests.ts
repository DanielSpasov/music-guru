import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc
} from 'firebase/firestore/lite';
import { Request, Response } from 'express';

import { createReferences, populateFields } from './helpers';
import { generateUID, getUser } from '../../Utils';
import converters from '../../Database/Converters';
import { Collection } from '../../Database/types';
import { PostProps, PatchProps } from './types';
import { errorHandler } from '../../Error';
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

      const populated = await populateFields(
        req.query?.populate?.toString(),
        snapshot
      );

      const document = {
        ...snapshot.data(),
        ...populated,
        ...(collectionName !== 'users' && {
          created_by: { uid: snapshot.get('created_by').id }
        })
      };

      res.status(200).json({ data: document });
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

export function post<T>({
  collectionName,
  validationSchema,
  references = []
}: PostProps<T>) {
  return async function (req: Request, res: Response) {
    try {
      const user = await getUser(req.headers?.authorization);
      const uid = await generateUID(collectionName);

      const validatedData = validationSchema.parse(req.body);
      const refs = await createReferences<T>(references, validatedData);
      const data = {
        ...validatedData,
        ...refs,
        created_by: doc(db, 'users', user.uid)
      };

      await setDoc(
        doc(db, collectionName, uid).withConverter(converters[collectionName]),
        data
      );

      res.status(200).json({ message: 'Success', uid, name: data.name });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function patch<T>({
  collectionName,
  validationSchema,
  references = []
}: PatchProps<T>) {
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

      const validatedData = validationSchema.parse(req.body);
      const refs = await createReferences<T>(references, validatedData);
      const data = {
        ...validatedData,
        ...refs,
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
