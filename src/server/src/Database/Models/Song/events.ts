import { ObjectId } from 'mongoose';

import ArtistModel from '../Artist';
import Schema from './schema';

// Pre Song 'Update'
Schema.pre('findOneAndUpdate', async function (next) {
  const doc = await this.model.findOne(this.getFilter()).populate('artist');
  if (!doc) return next();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const updated = this._update;

  // Update Artist ref
  const oldArtist = await ArtistModel.findOne({ uid: doc.artist.uid });
  const newArtist = await ArtistModel.findById(updated.artist);

  if (doc.artist.uid !== newArtist?.uid) {
    if (oldArtist) await oldArtist.del('songs', doc._id);
    if (newArtist) await newArtist.add('songs', doc._id);
  }

  // Update Artists features ref to the song
  const oldFeatures = new Set<ObjectId>(
    doc.features.map((x: ObjectId) => x.toString())
  );
  const newFeatures = new Set<ObjectId>(
    updated.features.map((x: ObjectId) => x.toString())
  );

  const added = Array.from(newFeatures).filter(x => !oldFeatures.has(x));
  const removed = Array.from(oldFeatures).filter(x => !newFeatures.has(x));

  const mapFn = (action: 'del' | 'add') => async (x: ObjectId) => {
    const artist = await ArtistModel.findById(x);
    if (artist) await artist[action]('features', doc._id);
  };
  await Promise.all(added.map(mapFn('add')));
  await Promise.all(removed.map(mapFn('del')));

  next();
});

// Pre Song 'Delete'
Schema.pre('findOneAndRemove', async function (next) {
  const song = await this.model.findOne(this.getFilter()).populate('artist');
  if (!song) return next();

  // Remove Song ref from Artist
  const artist = await ArtistModel.findById(song.artist._id);
  if (artist) {
    await artist.del('songs', song._id);
  }

  // Remove Song refs from Artists features list
  const features = await ArtistModel.find({
    _id: { $in: song.features }
  });
  if (features.length) {
    await Promise.all(features.map(x => x.del('features', song._id)));
  }

  next();
});
