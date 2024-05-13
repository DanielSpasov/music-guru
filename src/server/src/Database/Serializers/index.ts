import { Models, ObjSerialzier, Album, Artist, Song, User } from '../Types';

import { ListArtist, DetailedArtist } from './Artist';
import { ListAlbum, DetailedAlbum } from './Album';
import { DetailedSong, ListSong } from './Song';
import { ListUser } from './User';

export const serializers: Record<Models, ObjSerialzier> = {
  artists: {
    list: (data: Artist) => new ListArtist(data),
    detailed: (data: Artist) => new DetailedArtist(data)
  },
  albums: {
    list: (data: Album) => new ListAlbum(data),
    detailed: (data: Album) => new DetailedAlbum(data)
  },
  songs: {
    list: (data: Song) => new ListSong(data),
    detailed: (data: Song) => new DetailedSong(data)
  },
  users: {
    list: (data: User) => new ListUser(data),
    detailed: (data: User) => data
  }
};
