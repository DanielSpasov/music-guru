import { FavoriteFn, UpdateFavsFn } from '../../../Hooks/useFavorite/types';
import { Model } from '../../../Api/types';

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
