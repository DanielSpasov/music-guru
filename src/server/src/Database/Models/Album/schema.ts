import { Schema } from 'mongoose';
import { defaultTransform } from '../../helpers';

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
    songs: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Song'
      }
    ]
  },
  { toJSON: { transform: defaultTransform } }
);

export default AlbumSchema;
