import { Schema, model, InferSchemaType } from 'mongoose';
import { defaultTransform } from '../helpers';

const AlbumSchema = new Schema(
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
    discs: [
      {
        name: String,
        songs: [{ name: String }]
      }
    ]
  },
  {
    toJSON: { transform: defaultTransform }
  }
);

// On Album 'Delete'
AlbumSchema.pre('findOneAndRemove', async function (next) {
  const album = await this.model.findOne(this.getFilter()).populate('artist');
  if (!album) return next();

  // Remove Album ref from Artist
  const artist = await model('Artist').findById(album.artist._id);
  if (artist) {
    await artist.del('albums', album._id);
  }

  next();
});

// On Album 'Update'
AlbumSchema.pre('findOneAndUpdate', async function (next) {
  const album = await this.model.findOne(this.getFilter()).populate('artist');
  if (!album) return next();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const updated = this._update;

  // Update Artist ref
  const oldArtist = await model('Artist').findOne({ uid: album.artist.uid });
  const newArtist = await model('Artist').findById(updated.artist);
  if (album.artist.uid !== newArtist.uid) {
    if (oldArtist) oldArtist.del('albums', album._id);
    if (newArtist) newArtist.add('albums', album._id);
  }

  next();
});

export type IAlbum = InferSchemaType<typeof AlbumSchema>;

export default model<IAlbum>('Album', AlbumSchema);
