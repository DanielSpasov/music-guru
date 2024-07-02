import { FC, memo } from 'react';

import { ListSong } from '../../../../Types/Song';
import { defaultProps } from './helpers';
import { CardProps } from '../helpers';
import { Link } from '../..';

// Composables
import FavoritesCounter from '../composables/FavoritesConuter';

const SongCard: FC<CardProps<ListSong>> = ({
  data,
  favoriteFn,
  updateFavs,
  canFavorite,
  loading = false,
  isFavorite = false
}) => {
  if (loading) return <Skeleton />;
  return (
    <div
      data-testid="song-card"
      className={`flex w-52 h-16  m-3 rounded-md shadow-md ${defaultProps}`}
    >
      <img
        alt={data.name}
        src={data?.image || '/images/logo/blue-logo-square512.png'}
        className="w-12 h-12 m-2 rounded-sm"
        data-testid="song-card-image"
        loading="lazy"
      />

      <div className="flex flex-col justify-between w-full">
        <Link
          to={`/songs/${data.uid}`}
          data-testid="song-card-name"
          className="w-32 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {data.name}
        </Link>
        <Link
          to={`/artists/${data.artist.uid}`}
          data-testid="song-card-artist"
          className="w-28 text-sm text-neutral-500 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {data.artist.name}
        </Link>

        <div className="flex justify-between pr-1">
          <span className="text-sm text-neutral-500"></span>

          <FavoritesCounter
            model="songs"
            defaultCount={data.favorites}
            canFavorite={canFavorite}
            isFavorite={isFavorite}
            favoriteFn={favoriteFn}
            updateFavs={updateFavs}
            uid={data.uid}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(SongCard);

const Skeleton = () => {
  return (
    <div
      data-testid="song-card-skeleton"
      className="w-48 h-16 m-3 flex items-center bg-neutral-200 dark:bg-neutral-900 rounded-md animate-pulse"
    >
      <div className="w-12 h-12 bg-neutral-300 dark:bg-neutral-700 rounded-md m-2" />
      <div>
        <div className="w-24 h-5 bg-neutral-300 dark:bg-neutral-700 my-2 rounded-md" />
        <div className="w-16 h-5 bg-neutral-300 dark:bg-neutral-700 my-2 rounded-md" />
      </div>
    </div>
  );
};
