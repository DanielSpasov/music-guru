import { FC, useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import ArtistCard from './Artist';
import AlbumCard from './Album';
import SongCard from './Song';

import { FavoritesContext } from '../../../Contexts/Favorites';
import { IHeart, IHeartOutline, ISpinner } from '../../Icons';
import { CardSwitchProps, loadingProps } from './helpers';
import { AuthContext } from '../../../Contexts';
import { themeProps } from './helpers';

const Card: FC<CardSwitchProps> = ({
  model,
  data,
  loading,
  onClick,
  favoriteFn
}) => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [counter, setCounter] = useState<number>(data?.favorites || 0);
  const [processing, setProcessing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleFav = useCallback(async () => {
    try {
      if (!favoriteFn) return;

      setProcessing(true);

      const { favorites } = await favoriteFn(data.uid);
      setFavorites(favorites);

      const isFavorite = favorites?.[model]?.includes(data?.uid);

      setCounter(prev => prev + (isFavorite ? 1 : -1));
      toast.success(
        `${data?.name} ${isFavorite ? 'added to' : 'removed from'} favorites`
      );
    } catch (err) {
      toast.error('Failed to add favorite');
    } finally {
      setProcessing(false);
    }
  }, [data, setFavorites, model, favoriteFn]);

  const Component = useMemo(() => {
    const props = {
      data: { ...data, favorites: counter },
      loading,
      onClick
    };

    switch (model) {
      case 'songs':
        return <SongCard {...props} />;
      case 'albums':
        return <AlbumCard {...props} />;
      case 'artists':
        return <ArtistCard {...props} />;
      default:
        return <></>;
    }
  }, [data, loading, onClick, model, counter]);

  return (
    <div
      data-testid="card"
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {favoriteFn && isAuthenticated && isHovering && !loading ? (
        <div
          data-testid="card-favorite-icon"
          className="absolute top-6 right-6 z-50"
        >
          {processing ? (
            <ISpinner className={loadingProps} />
          ) : favorites?.[model]?.includes(data?.uid) ? (
            <IHeart className={themeProps} onClick={toggleFav} />
          ) : (
            <IHeartOutline className={themeProps} onClick={toggleFav} />
          )}
        </div>
      ) : null}

      {Component}
    </div>
  );
};

export default Card;
