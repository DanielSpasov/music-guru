import { FC } from 'react';

import { ListSong } from '../../../../Types/Song';
import { defaultProps } from './helpers';
import { CardProps } from '../helpers';

const SongCard: FC<CardProps<ListSong>> = ({
  data,
  onClick,
  loading = false
}) => {
  if (loading) return <Skeleton />;

  return (
    <div
      data-testid="song-card"
      className={`flex items-center w-48 h-16 p-2 m-3 rounded-md cursor-pointer shadow-md ${defaultProps}`}
      onClick={onClick}
    >
      <img
        onClick={onClick}
        alt={data.name}
        src={data?.image || '/images/logo/blue-logo-square512.png'}
        className="w-12 h-12 rounded-sm"
        data-testid="song-card-image"
        loading="lazy"
      />

      <div className="relative flex flex-col p-2">
        <span className="line-clamp-1" data-testid="song-card-name">
          {data.name}
        </span>
        <span
          className="text-neutral-500 truncate"
          data-testid="song-card-artist"
        >
          {data.artist}
        </span>
      </div>
    </div>
  );
};

export default SongCard;

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
