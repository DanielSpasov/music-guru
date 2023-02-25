import { Schema, model, InferSchemaType } from 'mongoose';

const AlbumSchema = new Schema({
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
});

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

export type IAlbum = InferSchemaType<typeof AlbumSchema>;

export default model<IAlbum>('Album', AlbumSchema);
