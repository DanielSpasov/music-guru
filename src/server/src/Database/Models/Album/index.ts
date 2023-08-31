import { model } from 'mongoose';

import { IAlbum } from './types';
import Schema from './schema';

export default model<IAlbum>('Album', Schema);
