import { model, Model } from 'mongoose';

import { ISong, ISongMethods } from './types';
import Schema from './schema';

export default model<ISong, Model<ISong, object, ISongMethods>>('Song', Schema);
