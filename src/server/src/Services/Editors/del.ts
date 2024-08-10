import { NextFunction, Request, Response } from 'express';

import { EditorSchema } from '../../Database/Schemas';
import { DBUser, User } from '../../Database/Types';
import { connect } from '../../Database';
import { BaseObject } from './helpers';
import { APIError } from '../../Error';

export default async (req: Request, res: Response, next: NextFunction) => {
  const mongo = await connect();
  try {
    const item = res.locals.item;
    const editorUID = EditorSchema.parse(req.params.editor);

    const db = mongo.db('models');

    const collection = db.collection<BaseObject>(res.locals.collection);
    const userCollection = db.collection<DBUser>('users');

    const editor = await userCollection.findOne({ uid: editorUID });
    if (!editor) throw new APIError(404, 'User not found.');

    const editorUIDs = item.editors.map((x: User) => x.uid);
    if (!editorUIDs.includes(editorUID)) {
      throw new APIError(400, 'User is not an editor.');
    }

    await collection.updateOne(
      { uid: req.params.id },
      { $pull: { editors: editorUID } }
    );

    res.status(200).json({ message: 'Editor removed.' });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
