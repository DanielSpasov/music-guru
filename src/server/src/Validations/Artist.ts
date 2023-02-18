import { Document, Types } from 'mongoose';
import { z } from 'zod';
import { Single } from './Single';

export const artistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type ArtistModel = z.infer<typeof artistSchema>;

export interface Artist extends ArtistModel {
  uid: string;
  created: Date;
  albums: any[];
  mixtapes: any[];
  singles: Single[];
  features: Single[];
}

export interface IArtist extends ArtistModel, Document {
  uid: string;
  created: Date;
  albums: Types.ObjectId[];
  mixtapes: Types.ObjectId[];
  singles: Types.ObjectId[];
  features: Types.ObjectId[];

  addSingle: (singleId: Types.ObjectId) => Promise<void>;
  delSingle: (singleId: Types.ObjectId) => Promise<void>;
}
