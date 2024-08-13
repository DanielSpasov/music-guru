import { Model as MongooseModel } from 'mongoose';

import { Model } from '../Types';

import AlbumType from './AlbumType';
import Artist from './Artist';
import Album from './Album';
import Song from './Song';
import User from './User';

export const schemas: Record<Model, MongooseModel<object>> = {
  album_types: AlbumType,
  artists: Artist,
  albums: Album,
  songs: Song,
  users: User
};
