import { ListArtist } from '../../../Types/Artist';
import { CardProps } from './helpers';
import { IHeart } from '../../Icons';

export const lightHoverProps = 'hover:bg-neutral-200';
export const darkHoverProps = 'dark:hover:bg-neutral-700';
const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

export default function ArtistCard({
  data,
  onClick,
  loading = false
}: CardProps<ListArtist>) {
  if (loading) return <Skeleton />;
  return (
    <div
      data-testid="artist-card"
      className={`flex flex-col m-3 cursor-pointer p-2 rounded-md ${hoverProps}`}
      onClick={onClick}
    >
      <div className="h-44 w-44">
        <img
          alt={data.name}
          src={data.image}
          data-testid="artist-card-image"
          className="w-full h-full rounded-md"
          loading="lazy"
        />
      </div>

      <div className="flex justify-between items-center mt-1">
        <span className="text-lg" data-testid="artist-card-name">
          {data.name}
        </span>

        <div className="flex items-center">
          <span className="text-sm p-1" data-testid="artist-card-favorites">
            {data.favorites}
          </span>
          <IHeart className="w-4 h-4 dark:[&>path]:fill-primary-dark" />
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div
      data-testid="artist-card-skeleton"
      className="relative bg-neutral-200 dark:bg-neutral-700 flex flex-col m-3 cursor-pointer p-2 rounded-md"
    >
      <div className="bg-neutral-300 dark:bg-neutral-800 w-44 h-44 rounded-md" />
      <div className="flex justify-between">
        <div className="bg-neutral-300 dark:bg-neutral-800 w-28 h-6 mt-2 rounded-md" />
        <div className="bg-neutral-300 dark:bg-neutral-800 w-10 h-6 mt-2 rounded-md" />
      </div>
    </div>
  );
}
