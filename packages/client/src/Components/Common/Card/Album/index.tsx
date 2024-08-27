import { useNavigate } from 'react-router-dom';
import { FC, memo } from 'react';
import moment from 'moment';

import { ListAlbum } from '../../../../Types';
import { CardProps } from '../types';

import css from './Album.module.css';

// Composables
import FavoritesCounter from '../composables/FavoritesConuter';

const AlbumCard: FC<CardProps<ListAlbum>> = ({ data, loading = false }) => {
  const navigate = useNavigate();

  if (loading) return <Skeleton />;
  return (
    <article
      data-testid="album-card"
      className={css.albumCard}
      onClick={() => navigate(`/albums/${data.uid}`)}
    >
      <img alt={data.name} src={data.image} data-testid="album-card-image" />

      <section>
        <p data-testid="album-card-name">{data.name}</p>

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

          <div onClick={e => e.stopPropagation()}>
            <FavoritesCounter
              defaultCount={data.favorites}
              model="albums"
              uid={data.uid}
            />
          </div>
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
      <div className="bg-neutral-200 dark:bg-neutral-900 w-full rounded-md">
        <div className="bg-neutral-300 dark:bg-neutral-700 rounded-md w-32 h-[1.125rem] mx-2 mb-2" />
        <div className="flex px-2 gap-2">
          <div className="bg-neutral-300 dark:bg-neutral-700 rounded-md w-16 h-[1.125rem] mb-2" />
          <div className="bg-neutral-300 dark:bg-neutral-700 rounded-md w-16 h-[1.125rem] mb-2" />
        </div>
      </div>
    </div>
  );
};
