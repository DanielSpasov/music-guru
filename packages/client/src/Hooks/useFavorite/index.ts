import { useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '../../Contexts';
import { UseFavoriteHook } from './types';
import Api from '../../Api';

export const useFavorite: UseFavoriteHook = ({ uid, model, defaultCount }) => {
  const { isAuthenticated, data, dispatch } = useContext(AuthContext);

  const [count, setCount] = useState(defaultCount);
  const [loading, setLoading] = useState(false);

  const isFavorite = useMemo(
    () => Boolean(data?.favorites[model]?.includes(uid)),
    [uid, data, model]
  );

  const updateData = useCallback(() => {
    if (!data) return;

    setCount(prev => (isFavorite ? prev - 1 : prev + 1));
    dispatch({
      type: 'UPDATE',
      payload: {
        data: {
          ...data,
          uid: data?.uid,
          favorites: {
            ...data?.favorites,
            [model]: isFavorite
              ? data?.favorites[model]?.filter(x => x !== uid)
              : [...(data?.favorites[model] || []), uid]
          }
        }
      }
    });
  }, [uid, model, data, dispatch, isFavorite]);

  const favorite = useCallback(async () => {
    try {
      if (!isAuthenticated) return;

      setLoading(true);
      updateData();
      await Api[model].favorite({ uid });
    } catch (err) {
      toast.error(`Failed to favorite ${model}.`);
      updateData();
    } finally {
      setLoading(false);
    }
  }, [updateData, isAuthenticated, model, uid]);

  return {
    canFavorite: Boolean(isAuthenticated),
    isFavorite,
    favorite,
    loading,
    count
  };
};
