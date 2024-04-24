import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { ArtistSchema, FileSchema } from '../../Database/Schemas';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getUploadLink } from '../../Controllers/helpers/helpers';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';
import env from '../../env';

export default async function post(req: Request, res: Response) {
  const mongo = await connect();
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
    const uid = crypto.randomUUID();

    if (req?.file) {
      const validatedFile = FileSchema.parse(req?.file);
      const name = validatedFile.originalname;
      const fileExt = name.split('.')[name.split('.').length - 1];
      const imageRef = ref(getStorage(), `images/artists/${uid}.${fileExt}`);
      await uploadBytes(imageRef, validatedFile.buffer);
    }

    const uploadedFile = await getUploadLink(req?.file, 'artists', uid);

    const db = mongo.db('models');
    const users = db.collection('users');
    const user = await users.findOne({ uid: userUID });
    if (!user) {
      res.status(400).json({ message: 'Invalid User UID.' });
      return;
    }

    const data = {
      ...ArtistSchema.parse(req.body),
      ...(req?.file ? { [req.file.fieldname]: uploadedFile } : {}),
      uid,
      created_by: userUID,
      created_at: new Date()
    };

    const collection = db.collection('artists');
    await collection.insertOne(data);

    res.status(200).json({ message: 'Success', uid, name: data.name });
  } catch (error) {
    errorHandler(req, res, error);
  } finally {
    mongo.close();
  }
}
