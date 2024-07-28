import { FC } from 'react';

import { UseFavoriteHookProps } from '../../../../Hooks/useFavorite/types';
import { IHeart, IHeartOutline, Loader } from '../../../';
import { useFavorite } from '../../../../Hooks';
import { CardModel } from '../types';

export type FavoritesCounterProps = {
  model: CardModel;
  canFavorite?: boolean;
} & UseFavoriteHookProps;

const FavoritesCounter: FC<FavoritesCounterProps> = ({
  model,
  canFavorite = false,
  isFavorite,
  ...hookProps
}) => {
  const { favCount, loadingFav, onFavorite } = useFavorite({
    ...hookProps,
    isFavorite,
    model
  });

  return (
    <div
      className="flex items-center"
      data-testid={`${model}-favorites-counter`}
    >
      <span
        className="text-sm p-0.5"
        data-testid={`${model}-card-favorites-count`}
      >
        {favCount}
      </span>

      {loadingFav ? (
        <Loader
          size="xsm"
          color="[&>path]:fill-red-500"
          data-testid={`${model}-card-spinner-svg`}
        />
      ) : isFavorite ? (
        <IHeart
          data-testid={`${model}-card-heart-svg`}
          className="w-4 h-4 [&>path]:fill-red-500"
          disabled={!hookProps?.favoriteFn || !canFavorite}
          onClick={() => onFavorite()}
        />
      ) : (
        <IHeartOutline
          data-testid={`${model}-card-heart-outline-svg`}
          className="w-4 h-4 [&>path]:fill-red-500"
          disabled={!hookProps?.favoriteFn || !canFavorite}
          onClick={() => onFavorite()}
        />
      )}
    </div>
  );
};

export default FavoritesCounter;
