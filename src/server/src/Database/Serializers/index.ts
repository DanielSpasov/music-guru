import {
  CollectionSerializer,
  UnpopulatedArtist,
  UnpopulatedAlbum,
  UnpopulatedSong
} from '../Types';

import { ListArtist, DetailedArtist } from './Artist';
import { ListAlbum, DetailedAlbum } from './Album';
import { DetailedSong, ListSong } from './Song';

export const serializers: CollectionSerializer = {
  artists: {
    list: async (data: UnpopulatedArtist) => new ListArtist(data),
    detailed: async (data: UnpopulatedArtist) => new DetailedArtist(data)
  },
  albums: {
    list: async (data: UnpopulatedAlbum) => new ListAlbum(data),
    detailed: async (data: UnpopulatedAlbum) => {
      const album = new DetailedAlbum(data);
      await album.populate('artist', 'artists', 'list');
      await album.populate('songs', 'songs', 'list');
      return album;
    }
  },
  songs: {
    list: async (data: UnpopulatedSong) => new ListSong(data),
    detailed: async (data: UnpopulatedSong) => {
      const song = new DetailedSong(data);
      await song.populate('albums', 'albums', 'list');
      await song.populate('artist', 'artists', 'list');
      await song.populate('features', 'artists', 'list');
      return song;
    }
  }
};
