import { FC } from 'react';

import { ListArtist } from '../../../../Types/Artist';
import FavoritesCounter from '../FavoritesConuter';
import { CardProps } from '../helpers';
import { hoverProps } from './helpers';
import { Link } from '../../../';

const ArtistCard: FC<CardProps<ListArtist>> = ({
  data,
  favoriteFn,
  canFavorite,
  loading = false,
  isFavorite = false
}) => {
  if (loading) return <Skeleton />;
  return (
    <article
      data-testid="artist-card"
      className={`flex flex-col m-3 p-2 pb-1 rounded-md ${hoverProps}`}
    >
      <img
        alt={data.name}
        src={data.image}
        data-testid="artist-card-image"
        className="w-40 h-40 rounded-md"
        loading="lazy"
      />

      <section className="flex justify-between items-center mt-1">
        <Link
          to={`/artists/${data.uid}`}
          data-testid="artist-card-name"
          className="w-32 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {data.name}
        </Link>

        <FavoritesCounter
          model="artists"
          defaultCount={data.favorites}
          defaultIsFav={isFavorite}
          canFavorite={canFavorite}
          favoriteFn={favoriteFn}
          uid={data.uid}
        />
      </section>
    </article>
  );
};

export default ArtistCard;

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
