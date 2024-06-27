import { FC, memo } from 'react';
import moment from 'moment';

import { ListAlbum } from '../../../../Types/Album';
import FavoritesCounter from '../FavoritesConuter';
import { defaultProps } from './helpers';
import { CardProps } from '../helpers';
import { Link } from '../../../';

const AlbumCard: FC<CardProps<ListAlbum>> = ({
  data,
  favoriteFn,
  canFavorite,
  loading = false,
  isFavorite = false
}) => {
  if (loading) return <Skeleton />;
  return (
    <article
      data-testid="album-card"
      className={`flex flex-col m-3 p-2 shadow-md rounded-md ${defaultProps}`}
    >
      <img
        alt={data.name}
        src={data.image}
        data-testid="album-card-image"
        loading="lazy"
        className="w-40 h-40 rounded-md"
      />

      <section className="flex flex-col pt-1">
        <Link
          to={`/albums/${data.uid}`}
          data-testid="album-card-link"
          className="text-base w-40 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {data.name}
        </Link>

        <div className="flex justify-between items-center text-md truncate w-40">
          <div>
            <span
              className="text-neutral-500"
              data-testid="album-card-release-date"
            >
              {data?.release_date ? moment(data?.release_date).year() : 'TBA'}
            </span>
            <span className="text-neutral-500 px-1">•</span>
            <span
              className="text-neutral-500 pr-1"
              data-testid="album-card-type"
            >
              {data.type.name}
            </span>
          </div>

          <FavoritesCounter
            model="albums"
            defaultCount={data.favorites}
            defaultIsFav={isFavorite}
            canFavorite={canFavorite}
            favoriteFn={favoriteFn}
            uid={data.uid}
          />
        </div>
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
