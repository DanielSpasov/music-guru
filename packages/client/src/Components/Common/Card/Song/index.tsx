import { useNavigate } from 'react-router-dom';
import { FC, memo } from 'react';

import { ListSong } from '../../../../Types';
import { CardProps } from '../types';

import css from './Song.module.css';

// Composables
import FavoritesCounter from '../composables/FavoritesConuter';

const SongCard: FC<CardProps<ListSong>> = ({ data, loading = false }) => {
  const navigate = useNavigate();

  if (loading) return <Skeleton />;
  return (
    <article
      data-testid="song-card"
      className={css.songCard}
      onClick={() => navigate(`/songs/${data.uid}`)}
    >
      <img
        alt={data.name}
        src={data?.image || '/images/logo/blue-logo-square512.png'}
        data-testid="song-card-image"
      />

      <section>
        <p className={css.songName} data-testid="song-card-name">
          {data.name}
        </p>
        <p className={css.artistName} data-testid="song-card-artist">
          {data.artist.name}
        </p>

        <div onClick={e => e.stopPropagation()}>
          <FavoritesCounter
            defaultCount={data.favorites}
            model="songs"
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
