import { Schema, model, Types, InferSchemaType, Model } from 'mongoose';

import { defaultTransform } from '../helpers';

type DiscographyTypes = 'songs' | 'features' | 'albums' | 'mixtapes';

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
  {
    toJSON: { transform: defaultTransform },
    methods: {
      async add(type: DiscographyTypes, id: Types.ObjectId) {
        if (this[type].includes(id)) return;
        this[type].push(id);
        await this.save();
      },

      async del(type: DiscographyTypes, id: Types.ObjectId) {
        if (!this[type].includes(id)) return;
        const itemIndex = this[type].indexOf(id);
        this[type].splice(itemIndex, 1);
        await this.save();
      }
    }
  }
);

export type IArtist = InferSchemaType<typeof ArtistSchema>;
export type IArtistMethods = {
  add: (type: DiscographyTypes, song_id: Types.ObjectId) => Promise<void>;
  del: (type: DiscographyTypes, song_id: Types.ObjectId) => Promise<void>;
};

export default model<IArtist, Model<IArtist, {}, IArtistMethods>>(
  'Artist',
  ArtistSchema
);
