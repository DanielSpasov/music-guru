import { model, Schema } from 'mongoose';

import { Song } from '../Types';
import Album from './Album';

const songSchema = new Schema<Song>({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  about: { type: String, default: '' },
  image: { type: String, default: '' },
  favorites: { type: Number, required: true, default: 0 },
  created_by: { type: String, required: true },
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
      number: { type: Number, required: true }
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

songSchema.post('findOneAndDelete', async (item, next) => {
  try {
    await Album.updateMany(
      { songs: { $in: [item.uid] } },
      { $pull: { songs: item.uid } }
    );

    next();
  } catch (err) {
    console.error('Failed to execute pre findOneAndDelete event.');
  }
});

export default model<Song>('Song', songSchema);
