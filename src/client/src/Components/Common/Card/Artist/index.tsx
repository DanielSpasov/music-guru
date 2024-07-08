import { FC, memo } from 'react';

import { ListArtist } from '../../../../Types/Artist';
import { CardProps } from '../helpers';
import { hoverProps } from './helpers';
import { Link } from '../../../';

// Composables
import FavoritesCounter from '../composables/FavoritesConuter';

const ArtistCard: FC<CardProps<ListArtist>> = ({
  data,
  favoriteFn,
  updateFavs,
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
      />

      <section className="flex justify-between items-center mt-1">
        <Link
          type="link"
          to={`/artists/${data.uid}`}
          data-testid="artist-card-name"
          className="w-32 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {data.name}
        </Link>

        <FavoritesCounter
          model="artists"
          defaultCount={data.favorites}
          canFavorite={canFavorite}
          isFavorite={isFavorite}
          favoriteFn={favoriteFn}
          updateFavs={updateFavs}
          uid={data.uid}
        />
      </section>
    </article>
  );
};

export default memo(ArtistCard);

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
