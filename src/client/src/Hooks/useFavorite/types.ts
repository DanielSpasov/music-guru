import { CardModel } from '../../Components/Common/Card/types';
import { Favorites } from '../../Types';

export type FavoriteFn = (uid: string) => Promise<{ favorites: Favorites }>;
export type UpdateFavsFn = (newFavs: string[]) => void;

export type UseFavoriteHookProps = {
  uid: string;
  model: CardModel;
  isFavorite: boolean;
  defaultCount: number;
  favoriteFn?: FavoriteFn;
  updateFavs?: UpdateFavsFn;
};

type UseFavoriteHookReturnProps = {
  onFavorite: () => Promise<void>;
  loadingFav: boolean;
  favCount: number;
};

export type UseFavoriteHook = (
  props: UseFavoriteHookProps
) => UseFavoriteHookReturnProps;
