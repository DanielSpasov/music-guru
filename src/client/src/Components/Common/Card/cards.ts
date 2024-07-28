import { ElementType } from 'react';

import { CardModel } from './types';

import ArtistCard from './Artist';
import AlbumCard from './Album';
import SongCard from './Song';

export const cards: Record<CardModel, ElementType> = {
  artists: ArtistCard,
  albums: AlbumCard,
  songs: SongCard
};
