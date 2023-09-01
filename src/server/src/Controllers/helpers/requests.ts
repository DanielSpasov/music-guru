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
  refereces = []
}: PostProps<T>) {
  return async function (req: Request, res: Response) {
    try {
      const user = await getUser(req.headers?.authorization);
      const validatedData = validationSchema.parse(req.body);
      const uid = await generateUID(collectionName);

      const references = await createReferences<T>(refereces, validatedData);

      const data = {
        ...validatedData,
        ...references,
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

export const patch =
  <T>({ Model, ValidationSchema, prepopulate }: PatchProps<T>) =>
  async (req: Request, res: Response) => {
    try {
      console.log('INSIDE');
      res.status(500).json({ message: 'TESTING' });
      // const user = await getUser(req.headers?.authorization);
      // const found = await Model.findOne({ uid: req.params.id }).populate(
      //   'created_by'
      // );
      // if (!found) {
      //   throw new CustomError({ message: 'Document not found.', code: 404 });
      // }
      // const doc = found as any; // TODO: find a way to avoid doing this
      // if (doc.created_by.uid !== user.uid) {
      //   throw new CustomError({ message: 'Permission denied.', code: 401 });
      // }

      // const validData = ValidationSchema.parse(req.body);

      // const data = await prepopulate?.reduce(async (prev, path) => {
      //   const field = Model.schema.paths[path as string];
      //   const isMulti = Array.isArray(validData[path]);
      //   const modelPath = isMulti
      //     ? field.options.type[0].ref
      //     : field.options.ref;
      //   const query = isMulti ? validData[path] : [validData[path]];

      //   const items = await model(modelPath).find({ uid: { $in: query } });

      //   return {
      //     ...(await prev),
      //     [path]: isMulti ? items.map(x => x?._id) : items[0]?._id
      //   };
      // }, validData);

      // await Model.findOneAndUpdate(
      //   { uid: req.params.id },
      //   { ...(data || validData) },
      //   { new: true }
      // );

      // await doc.save();

      // res.status(200).json({
      //   message: 'Success',
      //   data: { uid: req.params.id, name: validData.name }
      // });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
