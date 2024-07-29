import { z } from 'zod';

import { BaseAlbumSchema } from '../Schemas';
import { AlbumType } from './AlbumType';
import { Artist } from './Artist';
import { Song } from './Song';
import { User } from './User';

export interface Album extends z.infer<typeof BaseAlbumSchema> {
  uid: string;
  image: string;
  type: AlbumType;
  created_at: Date;
  created_by: User;
  artist: Artist;
  songs: Song[];
  release_date: Date | null;
}

export interface DBAlbum {
  name: string;
  image: string;
  type: AlbumType;
  created_by: string;
  artist: string;
  songs: string[];
  release_date: Date | null;
  created_at: Date;
  favorites: number;
}
