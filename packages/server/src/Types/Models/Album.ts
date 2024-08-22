import { Document } from 'mongoose';

import { AlbumType } from './AlbumType';
import { BaseModel } from './Base';
import { Artist } from './Artist';
import { Song } from './Song';
import { User } from './User';

export type Disc = {
  number: number;
  songs: Song[];
};

export type Album = Document &
  BaseModel & {
    type: AlbumType;
    created_by: User;
    artist: Artist;
    discs: Disc[];
    release_date: Date | null;
    about: string;
    links: { name: string; url: string }[];
  };
