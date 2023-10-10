import { Timestamp } from 'firebase/firestore/lite';
import { z } from 'zod';

import { ArtistSchema } from '../Schemas';

export interface Artist extends z.infer<typeof ArtistSchema> {
  uid: string;
  image: string;
  created_at: Date;
  created_by: string;
}

export interface DBArtist {
  name: string;
  image: string;
  created_at: Timestamp;
  created_by: string;
}
