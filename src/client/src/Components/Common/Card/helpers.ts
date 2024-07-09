import { ElementType } from 'react';

import { FavoriteFn, UpdateFavsFn } from '../../../Hooks/useFavorite/types';
import { Model } from '../../../Api/types';

import ArtistCard from './Artist';
import AlbumCard from './Album';
import SongCard from './Song';

export type CardProps<T> = {
  data: T;
  loading?: boolean;
  canFavorite?: boolean;
  isFavorite?: boolean;
  favoriteFn?: FavoriteFn;
  updateFavs?: UpdateFavsFn;
};

export type CardModel = Exclude<Model, 'users'>;

export type CardSwitchProps<T> = CardProps<T> & {
  model: CardModel;
};

export const cards: Record<CardModel, ElementType> = {
  artists: ArtistCard,
  albums: AlbumCard,
  songs: SongCard
};

const lightIconProps = '[&>path]:fill-primary';
const darkIconProps = 'dark:[&>path]:fill-primary-dark';
const iconProps = `[&>path]:opacity-100 ${lightIconProps} ${darkIconProps}`;

const iconHoverProps = `[&>path]:hover:opacity-70`;
export const themeProps = `${iconProps} ${iconHoverProps}`;

const lightLoadingProps = '[&>path]:fill-primary';
const darkLoadingProps = 'dark:[&>path]:fill-primary-dark';
export const loadingProps = `animate-spin ${lightLoadingProps} ${darkLoadingProps}`;

export const favoriteIconProps = 'w-4 h-4 [&>path]:fill-red-500';
