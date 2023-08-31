import { model, Model } from 'mongoose';

import { IArtist, IArtistMethods } from './types';
import Schema from './schema';

export default model<IArtist, Model<IArtist, object, IArtistMethods>>(
  'Artist',
  Schema
);
