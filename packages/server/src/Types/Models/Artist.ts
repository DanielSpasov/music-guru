import { Document } from 'mongoose';

import { BaseModel } from './Base';

export type Artist = Document &
  BaseModel & {
    about: string;
    links: { name: string; url: string }[];
  };
