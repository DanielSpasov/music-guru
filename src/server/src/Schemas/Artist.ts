import { model, Schema } from 'mongoose';

import { Artist } from '../Types';

const artistSchema = new Schema<Artist>({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  about: { type: String, default: '' },
  image: { type: String, required: true },
  favorites: { type: Number, required: true, default: 0 },
  links: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  created_by: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default model<Artist>('Artist', artistSchema);
