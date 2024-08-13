import { model, Schema } from 'mongoose';

import { User } from '../../Types';

const userSchema = new Schema<User>({
  uid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true },
  favorites: {
    artists: [{ type: String, ref: 'Artist' }],
    albums: [{ type: String, ref: 'Album' }],
    songs: [{ type: String, ref: 'Song' }]
  },
  created_at: { type: Date, default: Date.now }
});

export default model<User>('User', userSchema);
