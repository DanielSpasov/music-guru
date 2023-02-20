import { Document } from 'mongoose';

import { generateUID, getUser, getMongoSearchQuery } from '../Utils';
import { PostProps, DelProps, GetProps, FetchProps } from './helpers';
import { CustomError } from '../Error/CustomError';
import { errorHandler } from '../Error';

export async function fetch<T>({ req, res, Model }: FetchProps<T>) {
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

export async function get<T>({ req, res, Model }: GetProps<T>) {
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

export async function del<T>({ req, res, Model }: DelProps<T>) {
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

export async function post<T>({
  req,
  res,
  Model,
  ValidationSchema,
  preCreateFn,
  postCreateFn
}: PostProps<T>) {
  try {
    const user = await getUser(req.headers?.authorization);
    const validData = ValidationSchema.parse(req.body);
    const uid = await generateUID(Model);

    const { data } = preCreateFn ? await preCreateFn(validData) : { data: {} };

    const doc = new Model({
      uid,
      created: Date.now(),
      created_by: user._id,
      ...validData,
      ...data
    });

    if (postCreateFn) await postCreateFn(doc);

    doc.save();

    // There is no need to send the whole object,
    // since the FE redirects to the single view (uid)
    // and displays a toast notification (name)
    res.status(200).json({ message: 'Success', uid, name: validData.name });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
