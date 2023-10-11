import { CollectionSerializer, Album, Artist, Song } from '../Types';

import { ListArtist, DetailedArtist } from './Artist';
import { ListAlbum, DetailedAlbum } from './Album';
import { DetailedSong, ListSong } from './Song';

export const serializers: CollectionSerializer = {
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
  }
};
