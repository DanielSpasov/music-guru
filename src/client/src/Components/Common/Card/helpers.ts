import { FC } from 'react';

import { FavoriteFn, UpdateFavsFn } from '../../../Hooks/useFavorite';
import { ModelKeys } from '../../../Api/helpers';

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

export type CardModel = Exclude<ModelKeys, 'users'>;

export type CardSwitchProps = CardProps<any> & {
  model: CardModel;
};

export const cards: Record<CardModel, FC<CardProps<any>>> = {
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

export const favoriteIconProps = 'w-4 h-4 dark:[&>path]:fill-red-500';
