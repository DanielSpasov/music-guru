import { Document, Types } from 'mongoose';
import { z } from 'zod';
import { Single } from './Single';
import { User } from './User';

export const ArtistSchema = z.object({
  name: z.string(),
  image: z.string().url({ message: 'Invalid url.' })
});

export type ArtistModel = z.infer<typeof ArtistSchema>;

export interface Artist extends ArtistModel {
  uid: string;
  created: Date;
  created_by: User;
  albums: any[];
  mixtapes: any[];
  singles: Single[];
  features: Single[];
}
