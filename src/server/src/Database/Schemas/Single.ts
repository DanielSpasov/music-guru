import { Schema, model } from 'mongoose';

import { transformSingle } from '../../Transforms';
import { ISingle } from '../../Validations/Single';

const schema = new Schema<ISingle>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
      maxlength: 8
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      required: true,
      readonly: true
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'artist'
    },
    features: [
      {
        type: Schema.Types.ObjectId,
        ref: 'artist'
      }
    ],
    album: {
      type: Schema.Types.ObjectId,
      ref: 'album'
    },
    mixtape: {
      type: Schema.Types.ObjectId,
      ref: 'mixtape'
    }
  },
  {
    toJSON: { transform: transformSingle }
  }
);

schema.pre('findOneAndRemove', async function (next) {
  const single = await this.model.findOne(this.getFilter()).populate('artist');
  if (!single) return next();

  const artist = await model('artist').findById(single.artist._id);
  if (!artist) return next();

  artist.singles.pull(single._id);
  await artist.save();

  next();
});

export default model<ISingle>('single', schema);
