import { Request, Response } from 'express';

import { EditorSchema } from '../../Database/Schemas';
import { DBUser, User } from '../../Database/Types';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';
import { BaseObject } from './helpers';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const item = res.locals.item;
    const editorUID = EditorSchema.parse(req.params.editor);

    const db = mongo.db('models');

    const collection = db.collection<BaseObject>(res.locals.collection);
    const userCollection = db.collection<DBUser>('users');

    const editor = await userCollection.findOne({ uid: editorUID });
    if (!editor) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const editorUIDs = item.editors.map((x: User) => x.uid);
    if (!editorUIDs.includes(editorUID)) {
      res.status(400).json({ message: 'User is not an editor.' });
      return;
    }

    await collection.updateOne(
      { uid: req.params.id },
      { $pull: { editors: editorUID } }
    );

    res.status(200).json({ message: 'Editor removed.' });
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    mongo.close();
  }
}
