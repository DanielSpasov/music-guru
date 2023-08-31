import { Schema } from 'mongoose';

import { add, defaultTransform, del } from '../../helpers';
import { DiscographyTypes, IArtist } from './types';

const ArtistSchema = new Schema(
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
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Album'
      }
    ],
    mixtapes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Mixtape'
      }
    ],
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Song'
      }
    ],
    features: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Song'
      }
    ]
  },
  { toJSON: { transform: defaultTransform } }
);

ArtistSchema.method('add', add<IArtist, DiscographyTypes>);
ArtistSchema.method('del', del<IArtist, DiscographyTypes>);

export default ArtistSchema;
