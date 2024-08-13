import { model, Schema } from 'mongoose';

import { Album } from '../../Types';

const albumSchema = new Schema<Album>({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  favorites: { type: Number, required: true, default: 0 },
  type: {
    type: String,
    ref: 'Album_Types',
    required: true
  },
  created_by: { type: String, required: true },
  artist: {
    type: String,
    ref: 'Artist',
    required: true
  },
  songs: [
    {
      type: String,
      ref: 'Song',
      required: true
    }
  ],
  links: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  editors: [{ type: String, required: true }],
  release_date: { type: Date, default: null },
  created_at: { type: Date, default: Date.now }
});

export default model<Album>('Album', albumSchema);
