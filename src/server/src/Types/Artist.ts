import { Document, Types } from 'mongoose';
import { z } from 'zod';
import { Single } from './Single';
import { User } from './User';

export const artistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type ArtistModel = z.infer<typeof artistSchema>;

export interface Artist extends ArtistModel {
  uid: string;
  created: Date;
  created_by: User;
  albums: any[];
  mixtapes: any[];
  singles: Single[];
  features: Single[];
}

export interface IArtist extends ArtistModel, Document {
  uid: string;
  created: Date;
  created_by: Types.ObjectId;
  albums: Types.ObjectId[];
  mixtapes: Types.ObjectId[];
  singles: Types.ObjectId[];
  features: Types.ObjectId[];

  addSingle: (singleId: Types.ObjectId) => Promise<void>;
}
