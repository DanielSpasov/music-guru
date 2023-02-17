import { Document, Types } from 'mongoose';
import { z } from 'zod';

export const artistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type ArtistModel = z.infer<typeof artistSchema>;

export interface Artist extends ArtistModel, Document {
  uid: string;
  albums: Types.ObjectId[];
  mixtapes: Types.ObjectId[];
  singles: Types.ObjectId[];
  created: Date;

  addSingle: (singleId: Types.ObjectId) => Promise<void>;
}
