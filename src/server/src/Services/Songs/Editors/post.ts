import { Request, Response } from 'express';
import { Collection } from 'mongodb';

import { ListUser } from '../../../Database/Serializers/User';
import { EditorSchema } from '../../../Database/Schemas/Song';
import { DBUser } from '../../../Database/Types/User';
import { DBSong } from '../../../Database/Types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const db = mongo.db('models');
    const collection: Collection<DBSong> = db.collection('songs');
    const doc = await collection.findOne({
      uid: req.params.id
    });
    if (!doc) {
      res.status(404).json({ message: 'Song not found.' });
      return;
    }

    if (doc.created_by !== res.locals.user.uid) {
      res.status(403).json({ message: 'Permission denied.' });
      return;
    }

    const editorUID = EditorSchema.parse(req.body.userUID);
    const userCollection: Collection<DBUser> = db.collection('users');
    const editorUser = await userCollection.findOne({ uid: editorUID });
    if (!editorUser) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    if (doc.editors.includes(editorUID)) {
      res.status(400).json({ message: 'User is already an editor.' });
      return;
    }

    await collection.updateOne(
      { uid: req.params.id },
      { $push: { editors: editorUID } }
    );

    res
      .status(200)
      .json({ data: new ListUser(editorUser), message: 'Editor added.' });
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    mongo.close();
  }
}
