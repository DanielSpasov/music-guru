import { Document } from 'mongoose';

import { AlbumType } from './AlbumType';
import { BaseModel } from './Base';
import { Artist } from './Artist';
import { Song } from './Song';
import { User } from './User';

export type Album = Document &
  BaseModel & {
    type: AlbumType;
    created_by: User;
    artist: Artist;
    songs: Song[];
    release_date: Date | null;
  };
