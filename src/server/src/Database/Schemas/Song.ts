import { Schema, model, InferSchemaType } from 'mongoose';

import { defaultTransform } from '../helpers';

const SongSchema = new Schema(
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
    ],
    release_date: {
      type: Date,
      required: false
    }
  },
  {
    toJSON: { transform: defaultTransform }
  }
);

export type ISong = InferSchemaType<typeof SongSchema>;

// On Song 'Delete'
SongSchema.pre('findOneAndRemove', async function (next) {
  const song = await this.model.findOne(this.getFilter()).populate('artist');
  if (!song) return next();

  // Remove Song ref from Artist
  const artist = await model('Artist').findById(song.artist._id);
  if (artist) {
    await artist.del('songs', song._id);
  }

  // Remove Song refs from Artists features list
  const features = await model('Artist').find({
    _id: { $in: song.features }
  });
  if (features.length) {
    await Promise.all(features.map(x => x.del('features', song._id)));
  }

  next();
});

// On Song 'Update'
SongSchema.pre('findOneAndUpdate', async function (next) {
  const doc = await this.model.findOne(this.getFilter()).populate('artist');
  if (!doc) return next();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const updated = this._update;

  // Update Artist ref
  const oldArtist = await model('Artist').findOne({ uid: doc.artist.uid });
  const newArtist = await model('Artist').findById(updated.artist);
  if (doc.artist.uid !== newArtist.uid) {
    if (oldArtist) oldArtist.del('songs', doc._id);
    if (newArtist) newArtist.add('songs', doc._id);
  }

  // Update Artists features ref to the song
  const oldFeatures = new Set(doc.features.map((x: any) => x.toString()));
  const newFeatures = new Set(updated.features.map((x: any) => x.toString()));

  const added = Array.from(newFeatures).filter(x => !oldFeatures.has(x));
  const removed = Array.from(oldFeatures).filter(x => !newFeatures.has(x));

  const mapFn = (action: 'del' | 'add') => async (x: any) => {
    const artist = await model('Artist').findById(x);
    if (artist) await artist[action]('features', doc._id);
  };
  await Promise.all(added.map(mapFn('add')));
  await Promise.all(removed.map(mapFn('del')));

  next();
});

export default model<ISong>('Song', SongSchema);
