import { FC } from 'react';

import { IHeart, IHeartOutline, ISpinner } from '../../../Icons';
import { CardModel, favoriteIconProps } from '../helpers';
import useFavorite, {
  UseFavoriteHookProps
} from '../../../../Hooks/useFavorite';

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
        <ISpinner
          className={`${favoriteIconProps} animate-spin`}
          data-testid={`${model}-card-spinner-svg`}
        />
      ) : isFavorite ? (
        <IHeart
          data-testid={`${model}-card-heart-svg`}
          className={favoriteIconProps}
          disabled={!hookProps?.favoriteFn || !canFavorite}
          onClick={() => onFavorite()}
        />
      ) : (
        <IHeartOutline
          data-testid={`${model}-card-heart-outline-svg`}
          className={favoriteIconProps}
          disabled={!hookProps?.favoriteFn || !canFavorite}
          onClick={() => onFavorite()}
        />
      )}
    </div>
  );
};

export default FavoritesCounter;