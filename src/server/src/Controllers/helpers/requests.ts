import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import crypto from 'crypto';

import { getUploadLinks, QueryProps, serializeObj } from './helpers';
import { errorHandler } from '../../Error';
import env from '../../env';

// Database imports
import { FileUploadSchema, validationSchemas } from '../../Database/Schemas';
import { Collection, ModelCollection } from '../../Database/Types';
import { aggregators } from '../../Database/Aggregators';
import { connect } from '../../Database';

export function fetch(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const { serializer = 'list', ...params }: QueryProps = req.query;

      const filters = Object.entries(params).map(([name, value]) => {
        return {
          $match: { [name]: { $regex: value, $options: 'i' } }
        };
      });

      const db = await connect();
      const collection = db.collection(collectionName);
      const items = collection.aggregate([
        ...aggregators[collectionName as ModelCollection],
        ...filters
      ]);
      const docs = await items.toArray();

      const data = docs.map(doc =>
        serializeObj(doc, collectionName, serializer)
      );

      res.status(200).json({ data });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
}

export function get(collectionName: Collection) {
  return async function (req: Request, res: Response) {
    try {
      const { serializer = 'list' }: QueryProps = req.query;

      const db = await connect();
      const collection = db.collection(collectionName);

      const items = collection.aggregate([
        {
          $match: { uid: req.params.id }
        },
        ...aggregators[collectionName as ModelCollection]
      ]);
      const [item] = await items.toArray();
      if (!item) {
        res.status(404).json({ message: 'Document not found.' });
        return;
      }

      const data = serializeObj(item, collectionName, serializer);

      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
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
      const { uid: userUID } = jwt.verify(
        token,
        env.SECURITY.JWT_SECRET
      ) as JwtPayload;

      const test = await connect();
      const collection = test.collection(collectionName);
      const docs = collection.aggregate([{ $match: { uid: req.params.id } }]);
      const [item] = await docs.toArray();

      if (item?.created_by !== userUID) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      if (item?.image) {
        const fileExt = item?.image?.split(item.uid)[1].split('?')[0];
        const imageRef = ref(
          getStorage(),
          `images/${collectionName}/${item.uid}${fileExt}`
        );
        await deleteObject(imageRef);
      }

      await collection.deleteOne({ uid: req.params.id });

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
      const { uid: userUID } = jwt.verify(
        token,
        env.SECURITY.JWT_SECRET
      ) as JwtPayload;
      const uid = crypto.randomUUID();

      const colName = collectionName as ModelCollection;
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

      const db = await connect();
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

export function patch(collectionName: Collection) {
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

      const db = await connect();
      const collection = db.collection(collectionName);
      const doc = collection.aggregate([{ $match: { uid: req.params.id } }]);
      const [item] = await doc.toArray();
      if (item.created_by !== userUID) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      const validationSchema =
        validationSchemas[collectionName as ModelCollection];
      const validatedData = validationSchema.parse(req.body);

      await collection.findOneAndUpdate(
        { uid: req.params.id },
        { $set: validatedData },
        { upsert: true }
      );

      res.status(200).json({
        message: 'Success',
        data: { uid: req.params.id, name: validatedData.name }
      });
    } catch (error) {
      console.log(error);
      errorHandler(req, res, error);
    }
  };
}
