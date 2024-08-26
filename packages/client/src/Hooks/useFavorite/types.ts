import { CardModel } from '../../Components/Common/Card/types';
import { Favorites } from '../../Types';

export type FavoriteFn = (uid: string) => Promise<{ favorites: Favorites }>;
export type UpdateFavsFn = (newFavs: string[]) => void;

export type UseFavoriteHookProps = {
  uid: string;
  model: CardModel;
  defaultCount: number;
};

type UseFavoriteHookReturnProps = {
  favorite: () => Promise<void>;
  canFavorite: boolean;
  isFavorite: boolean;
  loading: boolean;
  count: number;
};

export type UseFavoriteHook = (
  props: UseFavoriteHookProps
) => UseFavoriteHookReturnProps;
