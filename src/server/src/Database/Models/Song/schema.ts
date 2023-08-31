import { Schema } from 'mongoose';

import { add, defaultTransform, del } from '../../helpers';
import { DiscographyTypes, ISong } from './types';

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
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Album'
      }
    ],
    release_date: {
      type: Date,
      required: false
    }
  },
  { toJSON: { transform: defaultTransform } }
);

SongSchema.method('add', add<ISong, DiscographyTypes>);
SongSchema.method('del', del<ISong, DiscographyTypes>);

export default SongSchema;
