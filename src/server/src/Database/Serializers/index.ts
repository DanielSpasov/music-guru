import { CollectionSerializer, Album, Artist, Song } from '../Types';

import { ListArtist, DetailedArtist } from './Artist';
import { ListAlbum, DetailedAlbum } from './Album';
import { DetailedSong, ListSong } from './Song';

export const serializers: CollectionSerializer = {
  artists: {
    list: async (data: Artist) => new ListArtist(data),
    detailed: async (data: Artist) => new DetailedArtist(data)
  },
  albums: {
    list: async (data: Album) => new ListAlbum(data),
    detailed: async (data: Album) => new DetailedAlbum(data)
  },
  songs: {
    list: async (data: Song) => new ListSong(data),
    detailed: async (data: Song) => new DetailedSong(data)
  }
};
