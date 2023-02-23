import { Schema, model, InferSchemaType } from 'mongoose';

import { defaultTransform } from '../helpers';

const SingleSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
      maxlength: 8,
      immutable: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      immutable: true,
      default: () => Date.now()
    },
    created_by: {
      immutable: true,
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    artist: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Artist'
    },
    features: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
      }
    ]
  },
  {
    toJSON: { transform: defaultTransform }
  }
);

export type ISingle = InferSchemaType<typeof SingleSchema>;

// On delete single
SingleSchema.pre('findOneAndRemove', async function (next) {
  const single = await this.model.findOne(this.getFilter()).populate('artist');
  if (!single) return next();

  // Remove single ref from artist
  const artist = await model('Artist').findById(single.artist._id);
  if (!artist) return next();

  artist.singles.pull(single._id);
  await artist.save();

  // Remove feature refs from featured artists
  const features = await model('Artist').find({
    _id: { $in: single.features }
  });
  await Promise.all(features.map(x => x.del('features', single._id)));

  next();
});

export default model<ISingle>('Single', SingleSchema);
