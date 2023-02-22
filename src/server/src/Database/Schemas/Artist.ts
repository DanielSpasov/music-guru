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
    singles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Single'
      }
    ],
    features: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Single'
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
        const itemIndex = this.singles.indexOf(single_id);
        this.singles.splice(itemIndex, 1);
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
