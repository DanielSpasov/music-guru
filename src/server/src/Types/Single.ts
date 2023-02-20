import { Document, Types } from 'mongoose';
import { z } from 'zod';
import { Artist } from './Artist';
import { User } from './User';

const Schema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export const SingleSchema = Schema.extend({
  artist: z.object({ uid: z.string().min(8).max(8) })
});

type SingleModel = z.infer<typeof Schema>;
export interface Single extends SingleModel {
  uid: string;
  created: Date;
  created_by: User;
  artist: Artist;
  features: Artist[];
  album: any; // TODO: Replace with Album Model when its ready
  mixtape: any; // TODO: Replace with Mixtape Model when its ready
}

export interface ISingle extends SingleModel, Document {
  uid: string;
  created: Date;
  created_by: Types.ObjectId;
  artist: Types.ObjectId;
  features: Types.ObjectId[];
  album: Types.ObjectId;
  mixtape: Types.ObjectId;
}
