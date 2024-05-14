import { Request, Response } from 'express';
import { Collection } from 'mongodb';

import { EditorSchema } from '../../../Database/Schemas/Song';
import { DBSong } from '../../../Database/Types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection: Collection<DBSong> = db.collection('songs');
    const doc = await collection.findOne({ uid: req.params.id });
    if (!doc) {
      res.status(404).json({ message: 'Song not found.' });
      return;
    }

    if (doc.created_by !== res.locals.user.uid) {
      res.status(403).json({ message: 'Permission denied.' });
      return;
    }

    const editorUID = EditorSchema.parse(req.params.editor);
    const userCollection = db.collection('users');
    const editorUser = await userCollection.findOne({ uid: editorUID });
    if (!editorUser) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    if (!doc.editors.includes(editorUID)) {
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
