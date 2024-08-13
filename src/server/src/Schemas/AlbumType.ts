import { model, Schema } from 'mongoose';

import { AlbumType } from '../Types';

const albumTypeSchema = new Schema<AlbumType>({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true }
});

export default model<AlbumType>('Album_Type', albumTypeSchema);
