import { NextFunction, Request, Response } from 'express';

import { ListUser } from '../../Serializers/User';
import { EditorSchema } from '../../Validations';
import { DBUser } from '../../Types/User';
import { connect } from '../../Database';
import { BaseObject } from './helpers';
import { APIError } from '../../Error';

export default async (req: Request, res: Response, next: NextFunction) => {
  const mongo = await connect();
  try {
    const item = res.locals.item;
    const editorUID = EditorSchema.parse(req.body.userUID);

    const db = mongo.db('models');

    const modelCollection = db.collection<BaseObject>(res.locals.collection);
    const userCollection = db.collection<DBUser>('users');

    const editor = await userCollection.findOne({ uid: editorUID });

    if (!editor) throw new APIError(404, 'User not found.');

    if (item.editors.includes(editorUID)) {
      throw new APIError(400, 'User is already an editor.');
    }

    await modelCollection.updateOne(
      { uid: item.uid },
      { $push: { editors: editorUID } }
    );

    res.status(200).json({ data: new ListUser(editor) });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
};
