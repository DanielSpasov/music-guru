import { useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import ArtistCard from './Artist';
import AlbumCard from './Album';
import SongCard from './Song';

import { FavoritesContext } from '../../../Contexts/Favorites';
import { AuthContext } from '../../../Contexts';
import { CardSwitchProps } from './helpers';
import Icon, { IconModel } from '../Icon';

const lightIconProps = '[&>path]:fill-primary';
const darkIconProps = 'dark:[&>path]:fill-primary-dark';
const iconProps = `[&>path]:opacity-70 ${lightIconProps} ${darkIconProps}`;

const iconHoverProps = `[&>path]:hover:opacity-100`;
const themeProps = `${iconProps} ${iconHoverProps}`;

const lightLoadingProps = '[&>path]:fill-primary';
const darkLoadingProps = 'dark:[&>path]:fill-primary-dark';
const loadingProps = `animate-spin ${lightLoadingProps} ${darkLoadingProps}`;

export default function Card({
  model,
  data,
  loading,
  onClick,
  favoriteFn
}: CardSwitchProps) {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [counter, setCounter] = useState<number>(data?.favorites || 0);
  const [processing, setProcessing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const icon = useMemo<IconModel>(() => {
    if (processing) return 'loading';
    return favorites?.[model]?.includes(data?.uid) ? 'heart' : 'heart-outline';
  }, [data?.uid, favorites, processing, model]);

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
          <Icon
            model={icon}
            disabled={processing}
            className={`${processing ? loadingProps : themeProps}`}
            onClick={toggleFav}
          />
        </div>
      ) : null}

      {Component}
    </div>
  );
}
