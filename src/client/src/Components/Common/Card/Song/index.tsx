import { FC, memo } from 'react';

import { ListSong } from '../../../../Types';
import { CardProps } from '../types';
import { Link } from '../..';

import css from './Song.module.css';

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
    <article data-testid="song-card" className={css.songCard}>
      <img
        alt={data.name}
        src={data?.image || '/images/logo/blue-logo-square512.png'}
        data-testid="song-card-image"
      />

      <section>
        <Link
          type="link"
          to={`/songs/${data.uid}`}
          data-testid="song-card-name"
          className={css.songLink}
        >
          {data.name}
        </Link>
        <Link
          type="link"
          to={`/artists/${data.artist.uid}`}
          data-testid="song-card-artist"
          className={css.aritstLink}
        >
          {data.artist.name}
        </Link>

        <div>
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
      </section>
    </article>
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
