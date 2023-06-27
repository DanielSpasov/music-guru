import { Request, Response } from 'express';
import { Document, model } from 'mongoose';

import { generateUID, getUser, getSearchQuery } from '../Utils';
import { CustomError } from '../Error/CustomError';
import { errorHandler } from '../Error';
import {
  PostProps,
  DelProps,
  GetProps,
  FetchProps,
  PatchProps
} from './helpers';

export const fetch =
  <T>({ Model }: FetchProps<T>) =>
  async (req: Request, res: Response) => {
    try {
      // Searching
      const search = getSearchQuery(req.query.search as string);
      if (!search) {
        res.status(200).json({ data: [] });
        return;
      }

      const limit = Number(req.query.limit) || 25;
      const data = await Model.find(search).limit(limit);
      res.status(200).json({ data });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

export const get =
  <T>({ Model }: GetProps<T>) =>
  async (req: Request, res: Response) => {
    try {
      const found = await Model.findOne({ uid: req.params.id });
      if (!found) {
        throw new CustomError({ message: 'Document not Found.', code: 404 });
      }
      const doc = found as Document<T>;

      // Dynamically populate fields
      const populate: string[] =
        req.query?.populate?.toString().split(',') || [];
      await Promise.all(populate.map(x => doc.populate(x)));

      res.status(200).json({ data: doc.toJSON() });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

export const del =
  <T>({ Model }: DelProps<T>) =>
  async (req: Request, res: Response) => {
    try {
      const found = await Model.findOne({ uid: req.params.id }).populate(
        'created_by'
      );
      if (!found) {
        throw new CustomError({ message: 'Document not found.', code: 404 });
      }
      const doc = found as any; // TODO: find a way to avoid doing this

      const user = await getUser(req.headers?.authorization);
      if (doc.created_by.uid !== user.uid) {
        res.status(401).json({ message: 'Permission denied.' });
        return;
      }

      await Model.findOneAndRemove({ uid: req.params.id });
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

export const post =
  <T>({ Model, ValidationSchema, prepopulate, relations }: PostProps<T>) =>
  async (req: Request, res: Response) => {
    try {
      const user = await getUser(req.headers?.authorization);
      const validData = ValidationSchema.parse(req.body);
      const uid = await generateUID(Model);

      const data = await prepopulate?.reduce(async (prev, path) => {
        const field = Model.schema.paths[path as string];
        const isMulti = Array.isArray(validData[path]);
        const modelPath = isMulti
          ? field.options.type[0].ref
          : field.options.ref;
        const query = isMulti ? validData[path] : [validData[path]];

        const items = await model(modelPath).find({ uid: { $in: query } });

        return {
          ...(await prev),
          [path]: isMulti ? items.map(x => x._id) : items[0]._id
        };
      }, validData);

      const doc = new Model({
        uid,
        created_by: user._id,
        ...(data || validData)
      });

      relations?.forEach(async ({ key, relation }) => {
        const field = Model.schema.paths[key as string];
        const isMulti = Array.isArray(validData[key]);
        const modelPath = isMulti
          ? field.options.type[0].ref
          : field.options.ref;
        const query = isMulti ? validData[key] : [validData[key]];

        const items = await model(modelPath).find({ uid: { $in: query } });
        items.forEach(async item => {
          Array.isArray(relation)
            ? item[relation[0]].push(doc._id)
            : (item[relation[0]] = doc._id);
          await item.save();
        });
      });

      await doc.save();

      res.status(200).json({ message: 'Success', uid, name: validData.name });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };

export const patch =
  <T>({ Model, ValidationSchema, preUpdateFn, postUpdateFn }: PatchProps<T>) =>
  async (req: Request, res: Response) => {
    try {
      const user = await getUser(req.headers?.authorization);
      const found = await Model.findOne({ uid: req.params.id }).populate(
        'created_by'
      );
      if (!found) {
        throw new CustomError({ message: 'Document not found.', code: 404 });
      }
      const doc = found as any; // TODO: find a way to avoid doing this
      if (doc.created_by.uid !== user.uid) {
        throw new CustomError({ message: 'Permission denied.', code: 401 });
      }

      const validData = ValidationSchema.parse(req.body);

      const { data } = preUpdateFn
        ? await preUpdateFn(validData)
        : { data: {} };

      const updated = await Model.findOneAndUpdate(
        { uid: req.params.id },
        {
          ...validData,
          ...data
        },
        { new: true }
      );

      if (postUpdateFn) await postUpdateFn(doc, updated);

      await doc.save();

      res.status(200).json({
        message: 'Success',
        data: { uid: req.params.id, name: validData.name }
      });
    } catch (error) {
      errorHandler(req, res, error);
    }
  };
