import { model, Schema } from 'mongoose';

import { Album } from '../Types';

const albumSchema = new Schema<Album>({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  about: { type: String, default: '', max: 5000 },
  favorites: { type: Number, required: true, default: 0 },
  type: { type: String, ref: 'Album_Types', required: true },
  created_by: { type: String, required: true },
  artist: { type: String, ref: 'Artist', required: true },
  discs: {
    type: [
      {
        number: { type: Number },
        songs: {
          type: [
            {
              number: { type: Number },
              uid: { type: String, ref: 'Song' },
              _id: false
            }
          ],
          default: []
        },
        _id: false
      }
    ],
    default: []
  },
  links: {
    type: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        _id: false
      }
    ],
    default: []
  },
  editors: {
    type: [{ type: String }],
    default: []
  },
  release_date: { type: Date, default: null },
  created_at: { type: Date, default: Date.now }
});

export default model<Album>('Album', albumSchema);
