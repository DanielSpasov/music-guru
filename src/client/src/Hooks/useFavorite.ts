import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const useFavorite: UseFavoriteHook = ({
  favoriteFn,
  uid,
  defaultCount,
  defaultIsFav
}) => {
  const [favCount, setFavCount] = useState(defaultCount);
  const [loadingFav, setLoadingFav] = useState(false);
  const [isFav, setIsFav] = useState(defaultIsFav);

  const onFavorite = useCallback(async () => {
    try {
      if (!favoriteFn) return;
      setLoadingFav(true);

      await favoriteFn(uid);

      if (isFav) {
        setFavCount(prev => prev - 1);
        setIsFav(false);
        return;
      }

      setFavCount(prev => prev + 1);
      setIsFav(true);
    } catch (err) {
      toast.error('Failed to favorite.');
    } finally {
      setLoadingFav(false);
    }
  }, [favoriteFn, uid, isFav]);

  return {
    loadingFav,
    onFavorite,
    favCount,
    isFav
  };
};

export default useFavorite;

export type favoriteFn = (uid: string) => Promise<void>;

export type UseFavoriteHookProps = {
  favoriteFn?: favoriteFn;
  uid: string;
  defaultCount: number;
  defaultIsFav: boolean;
};

type UseFavoriteHookReturnProps = {
  onFavorite: () => Promise<void>;
  loadingFav: boolean;
  favCount: number;
  isFav: boolean;
};

type UseFavoriteHook = ({
  uid,
  favoriteFn,
  defaultCount,
  defaultIsFav
}: UseFavoriteHookProps) => UseFavoriteHookReturnProps;
