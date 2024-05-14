import { Request, Response } from 'express';
import { Collection } from 'mongodb';

import { serializers } from '../../../Database/Serializers';
import { DBSong } from '../../../Database/Types';
import { errorHandler } from '../../../Error';
import { connect } from '../../../Database';

export default async function (req: Request, res: Response) {
  const mongo = await connect();
  try {
    const { limit = 25, ...params } = req.query;

    const filters = Object.entries(params).map(([name, value]) => {
      const isBool = value === 'true' || value === 'false';
      return {
        $match: {
          [name]: isBool
            ? { $eq: value === 'true' }
            : { $regex: value, $options: 'i' }
        }
      };
    });

    const db = mongo.db('models');
    const collection: Collection<DBSong> = db.collection('songs');
    const song = await collection.findOne({ uid: req.params.id });
    if (!song) {
      res.status(404).json({ message: 'Song not found.' });
      return;
    }

    if (song.created_by !== res.locals.userUID) {
      res.status(403).json({ message: 'Permission denied.' });
      return;
    }

    const userCollection = db.collection('users');
    const availableEditors = userCollection.aggregate([
      {
        $match: {
          uid: { $nin: song.editors, $ne: song.created_by }
        }
      },
      ...filters,
      { $project: { _id: 0 } },
      { $limit: Number(limit) }
    ]);

    const items = await availableEditors.toArray();
    const data = items.map(serializers.users.list);

    res
      .status(200)
      .json({ data, message: 'Availalbe editors fetched successfully.' });
  } catch (err) {
    errorHandler(req, res, err);
  } finally {
    mongo.close();
  }
}
