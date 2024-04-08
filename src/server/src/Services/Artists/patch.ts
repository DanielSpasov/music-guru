import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { ArtistSchema } from '../../Database/Schemas';
import { ExtendedRequest } from '../../Database';
import { errorHandler } from '../../Error';
import env from '../../env';

export default async function patch(request: Request, res: Response) {
  const req = request as ExtendedRequest;
  try {
    const token = req.headers?.authorization;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    const { uid: userUID } = jwt.verify(
      token,
      env.SECURITY.JWT_SECRET
    ) as JwtPayload;

    const collection = req.mongo.db('models').collection('artists');
    const doc = collection.aggregate([{ $match: { uid: req.params.id } }]);
    const [item] = await doc.toArray();
    if (item.created_by !== userUID) {
      res.status(401).json({ message: 'Permission denied.' });
      return;
    }

    const updated = await collection.findOneAndUpdate(
      { uid: req.params.id },
      {
        $set: {
          ...item,
          ...ArtistSchema.parse({
            ...req.body,
            favorites: item.favorites
          })
        }
      },
      { upsert: true, returnDocument: 'after' }
    );

    res.status(200).json({
      message: 'Success',
      data: { uid: req.params.id, name: updated?.name }
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
}
