import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { UseFavoriteHook } from './types';

export const useFavorite: UseFavoriteHook = ({
  uid,
  model,
  isFavorite,
  favoriteFn,
  updateFavs,
  defaultCount
}) => {
  const [favCount, setFavCount] = useState(defaultCount);
  const [loadingFav, setLoadingFav] = useState(false);

  const onFavorite = useCallback(async () => {
    try {
      if (!favoriteFn || !updateFavs) return;
      setLoadingFav(true);

      const { favorites } = await favoriteFn(uid);
      updateFavs(favorites?.[model] || []);

      if (isFavorite) {
        setFavCount(prev => prev - 1);
        return;
      }

      setFavCount(prev => prev + 1);
    } catch (err) {
      toast.error('Failed to favorite.');
    } finally {
      setLoadingFav(false);
    }
  }, [favoriteFn, updateFavs, uid, isFavorite, model]);

  return {
    loadingFav,
    onFavorite,
    favCount
  };
};
