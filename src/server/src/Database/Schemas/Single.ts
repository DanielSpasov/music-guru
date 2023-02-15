import { Schema, model } from 'mongoose';

import { transformSingle } from '../../Transforms';
import { Single } from '../../Validations/Single';

const schema = new Schema<Single>(
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
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'artist'
    },
    album: {
      type: {},
      default: {}
    },
    mixtape: {
      type: {},
      default: {}
    }
  },
  {
    toJSON: {
      transform: transformSingle
    }
  }
);

export default model('single', schema);
