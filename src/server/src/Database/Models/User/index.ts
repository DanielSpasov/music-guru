import { model } from 'mongoose';

import { IUser } from './types';
import Schema from './schema';

export default model<IUser>('User', Schema);
