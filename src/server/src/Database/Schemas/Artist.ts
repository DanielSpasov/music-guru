import { Schema, model, Types, InferSchemaType, Model } from 'mongoose';

import { defaultTransform } from '../helpers';

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
      required: true,
      readonly: true,
      immutable: true,
      default: () => Date.now()
    },
    created_by: {
      immutable: true,
      required: true,
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
    toJSON: { transform: defaultTransform },
    methods: {
      async addSingle(single_id: Types.ObjectId) {
        if (this.singles.includes(single_id)) return;
        this.singles.push(single_id);
        await this.save();
      },

      async removeSingle(single_id: Types.ObjectId) {
        if (!this.singles.includes(single_id)) return;
        this.singles.filter(x => x !== single_id);
        await this.save();
      }
    }
  }
);

export type IArtist = InferSchemaType<typeof ArtistSchema>;
export type IArtistMethods = {
  addSingle: (single_id: Types.ObjectId) => Promise<void>;
  removeSingle: (single_id: Types.ObjectId) => Promise<void>;
};

export default model<IArtist, Model<IArtist, {}, IArtistMethods>>(
  'Artist',
  ArtistSchema
);
