import { FC, memo } from 'react';
import moment from 'moment';

import { ListAlbum } from '../../../../Types';
import { CardProps } from '../types';
import { Link } from '../../../';

import css from './Album.module.css';

// Composables
import FavoritesCounter from '../composables/FavoritesConuter';

const AlbumCard: FC<CardProps<ListAlbum>> = ({
  data,
  favoriteFn,
  updateFavs,
  canFavorite,
  loading = false,
  isFavorite = false
}) => {
  if (loading) return <Skeleton />;
  return (
    <article data-testid="album-card" className={css.albumCard}>
      <img alt={data.name} src={data.image} data-testid="album-card-image" />

      <section>
        <Link
          type="link"
          to={`/albums/${data.uid}`}
          data-testid="album-card-link"
        >
          {data.name}
        </Link>

        <article>
          <div>
            <span
              data-testid="album-card-release-date"
              className={css.grayText}
            >
              {data?.release_date ? moment(data?.release_date).year() : 'TBA'}
            </span>

            <span className={css.grayText}>•</span>

            <span className={css.grayText} data-testid="album-card-type">
              {data.type.name}
            </span>
          </div>

          <FavoritesCounter
            model="albums"
            defaultCount={data.favorites}
            canFavorite={canFavorite}
            isFavorite={isFavorite}
            favoriteFn={favoriteFn}
            updateFavs={updateFavs}
            uid={data.uid}
          />
        </article>
      </section>
    </article>
  );
};

export default memo(AlbumCard);

const Skeleton = () => {
  return (
    <div
      data-testid="album-card-skeleton"
      className="flex flex-col items-center m-3 animate-pulse bg-neutral-200 dark:bg-neutral-900 rounded-md"
    >
      <div className="bg-neutral-300 dark:bg-neutral-700 w-40 h-40 m-2 rounded-md" />
      <div className="bg-neutral-200 dark:bg-neutral-900 w-full h-14 pb-1 rounded-md">
        <div className="bg-neutral-300 dark:bg-neutral-700 rounded-md w-24 h-5 mx-2 mb-2" />
        <div className="bg-neutral-300 dark:bg-neutral-700 rounded-md w-16 h-5 mx-2 mb-2" />
      </div>
    </div>
  );
};
