import { Models, ObjSerialzier } from '../Types';

import { ListArtist, DetailedArtist } from './Artist';
import { ListAlbum, DetailedAlbum } from './Album';
import { DetailedSong, ListSong } from './Song';
import { ListUser } from './User';

export const serializers: Record<Models, ObjSerialzier> = {
  artists: {
    list: data => new ListArtist(data),
    detailed: data => new DetailedArtist(data)
  },
  albums: {
    list: data => new ListAlbum(data),
    detailed: data => new DetailedAlbum(data)
  },
  songs: {
    list: data => new ListSong(data),
    detailed: data => new DetailedSong(data)
  },
  users: {
    list: data => new ListUser(data)
  },
  album_types: {}
};
