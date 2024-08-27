import { useNavigate } from 'react-router-dom';
import { FC, memo } from 'react';

import { ListArtist } from '../../../../Types';
import { CardProps } from '../types';

import css from './Artist.module.css';

// Composables
import FavoritesCounter from '../composables/FavoritesConuter';

const ArtistCard: FC<CardProps<ListArtist>> = ({ data, loading = false }) => {
  const navigate = useNavigate();

  if (loading) return <Skeleton />;
  return (
    <article
      data-testid="artist-card"
      className={css.artistCard}
      onClick={() => navigate(`/artists/${data.uid}`)}
    >
      <img alt={data.name} src={data.image} data-testid="artist-card-image" />

      <section>
        <p data-testid="artist-card-name">{data.name}</p>

        <div onClick={e => e.stopPropagation()}>
          <FavoritesCounter
            model="artists"
            defaultCount={data.favorites}
            uid={data.uid}
          />
        </div>
      </section>
    </article>
  );
};

export default memo(ArtistCard) as typeof ArtistCard;

const Skeleton = () => {
  return (
    <div
      data-testid="artist-card-skeleton"
      className="relative bg-neutral-200 dark:bg-neutral-700 flex flex-col m-3 cursor-pointer p-2 rounded-md"
    >
      <div className="bg-neutral-300 dark:bg-neutral-800 w-40 h-40 rounded-md" />
      <div className="flex justify-between">
        <div className="bg-neutral-300 dark:bg-neutral-800 w-28 h-6 mt-2 rounded-md" />
        <div className="bg-neutral-300 dark:bg-neutral-800 w-10 h-6 mt-2 rounded-md" />
      </div>
    </div>
  );
};
