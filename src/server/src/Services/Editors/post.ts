import { Request, Response } from 'express';

import { ListUser } from '../../Database/Serializers/User';
import { EditorSchema } from '../../Database/Schemas';
import { DBUser } from '../../Database/Types/User';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';
import { BaseObject } from './helpers';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const item = res.locals.item;
    const editorUID = EditorSchema.parse(req.body.userUID);

    const db = mongo.db('models');

    const modelCollection = db.collection<BaseObject>(res.locals.collection);
    const userCollection = db.collection<DBUser>('users');

    const editor = await userCollection.findOne({ uid: editorUID });

    if (!editor) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    if (item.editors.includes(editorUID)) {
      res.status(400).json({ message: 'User is already an editor.' });
      return;
    }

    await modelCollection.updateOne(
      { uid: item.uid },
      { $push: { editors: editorUID } }
    );

    res.status(200).json({ data: new ListUser(editor) });
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    mongo.close();
  }
}
