import { ObjectId } from 'mongoose';
import ArtistModel from '../Artist';
import SongModel from '../Song';
import Schema from './schema';

// Pre Album 'Delete'
Schema.pre('findOneAndRemove', async function (next) {
  const album = await this.model.findOne(this.getFilter()).populate('artist');
  if (!album) return next();

  // Remove Album ref from Artist
  const artist = await ArtistModel.findById(album.artist._id);
  if (artist) {
    await artist.del('albums', album._id);
  }

  // Remove Album refs from Songs albums list
  const songs = await SongModel.find({
    _id: { $in: album.songs }
  });
  if (songs.length) {
    await Promise.all(songs.map(x => x.del('albums', album._id)));
  }

  next();
});

// Pre Album 'Update'
Schema.pre('findOneAndUpdate', async function (next) {
  const album = await this.model.findOne(this.getFilter()).populate('artist');
  if (!album) return next();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const updated = this._update;

  // Update Artist ref
  const oldArtist = await ArtistModel.findOne({ uid: album.artist.uid });
  const newArtist = await ArtistModel.findById(updated.artist);
  if (album.artist.uid !== newArtist?.uid) {
    if (oldArtist) oldArtist.del('albums', album._id);
    if (newArtist) newArtist.add('albums', album._id);
  }

  // Update Album songs
  const oldSongs = new Set<ObjectId>(
    album.songs.map((x: ObjectId) => x.toString())
  );
  const newSongs = new Set<ObjectId>(
    updated.songs.map((x: ObjectId) => x.toString())
  );

  const added = Array.from(newSongs).filter(x => !oldSongs.has(x));
  const removed = Array.from(oldSongs).filter(x => !newSongs.has(x));

  const mapFn = (action: 'del' | 'add') => async (x: ObjectId) => {
    const song = await SongModel.findById(x);
    if (song) await song[action]('albums', album._id);
  };
  await Promise.all(added.map(mapFn('add')));
  await Promise.all(removed.map(mapFn('del')));
  next();
});
