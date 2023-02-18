import { Schema, model, Types } from 'mongoose';

import { transformArtist } from '../../Transforms';
import { IArtist } from '../../Validations/Artist';

const schema = new Schema<IArtist>(
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
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: 'album'
      }
    ],
    mixtapes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'mixtape'
      }
    ],
    singles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'single'
      }
    ],
    features: [
      {
        type: Schema.Types.ObjectId,
        ref: 'single'
      }
    ]
  },
  {
    toJSON: { transform: transformArtist },
    methods: {
      async addSingle(singleId: Types.ObjectId) {
        if (this.singles.includes(singleId)) return;
        this.singles.push(singleId);
        await this.save();
      }
    }
  }
);

export default model<IArtist>('artist', schema);
