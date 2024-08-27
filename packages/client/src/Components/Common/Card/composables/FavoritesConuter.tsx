import { FC, memo } from 'react';

import { UseFavoriteHookProps } from '../../../../Hooks/useFavorite/types';
import { IHeart, IHeartOutline } from '../../../';
import { useFavorite } from '../../../../Hooks';

const FavoritesCounter: FC<UseFavoriteHookProps> = ({
  defaultCount,
  model,
  uid
}) => {
  const { count, loading, favorite, isFavorite, canFavorite } = useFavorite({
    defaultCount,
    model,
    uid
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
        {count}
      </span>

      {isFavorite ? (
        <IHeart
          data-testid={`${model}-card-heart-svg`}
          className="w-4 h-4 [&>path]:fill-red-500"
          disabled={!canFavorite || loading}
          onClick={() => favorite()}
        />
      ) : (
        <IHeartOutline
          data-testid={`${model}-card-heart-outline-svg`}
          className="w-4 h-4 [&>path]:fill-red-500"
          disabled={!canFavorite || loading}
          onClick={() => favorite()}
        />
      )}
    </div>
  );
};

export default memo(FavoritesCounter);
