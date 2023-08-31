import { model } from 'mongoose';

import { IAlbum } from './types';
import Schema from './schema';
import './events';

export default model<IAlbum>('Album', Schema);
