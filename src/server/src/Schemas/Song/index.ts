import { model, Schema } from 'mongoose';

import { Song } from '../../Types';

const songSchema = new Schema<Song>({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  about: { type: String, default: '' },
  image: { type: String, default: '' },
  favorites: { type: Number, required: true, default: 0 },
  created_by: {
    type: String,
    ref: 'User',
    required: true
  },
  artist: {
    type: String,
    ref: 'Artist',
    required: true
  },
  features: [
    {
      type: String,
      ref: 'Artist',
      required: true
    }
  ],
  verses: [
    {
      title: { type: String, required: true },
      lyrics: { type: String, required: true },
      number: { type: String, required: true }
    }
  ],
  editors: [
    {
      type: String,
      ref: 'User',
      required: true
    }
  ],
  release_date: { type: Date, default: null },
  created_at: { type: Date, default: Date.now }
});

export default model<Song>('Song', songSchema);
