import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';

import { getMongoSearchQuery } from '../Utils/getSearchQuery';
import { CustomError } from '../Error/CustomError';
import { errorHandler } from '../Error';
import getUser from '../Utils/getUser';

export async function fetch<T>(req: Request, res: Response, Model: Model<T>) {
  try {
    // Searching
    const search = getMongoSearchQuery(req.query.search);
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
}

export async function get<T>(req: Request, res: Response, Model: Model<T>) {
  try {
    const found = await Model.findOne({ uid: req.params.id });
    if (!found) {
      throw new CustomError({ message: 'Document not Found.', code: 404 });
    }
    const doc = found as Document<T>;

    // Dynamically populate fields
    const populate: string[] = req.query?.populate?.toString().split(',') || [];
    await Promise.all(populate.map(x => doc.populate(x)));

    res.status(200).json({ data: doc.toJSON() });
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export async function del<T>(req: Request, res: Response, Model: Model<T>) {
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
}
