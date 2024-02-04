import { Artist } from '../../../Pages/artists/helpers';
import { CardProps } from './helpers';

export const lightProps = 'bg-neutral-200';
export const darkProps = 'dark:bg-neutral-900';
const themeProps = `${lightProps} ${darkProps}`;

export const lightHoverProps = 'hover:shadow-neutral-400';
export const darkHoverProps = 'dark:hover:shadow-neutral-900';
const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

export const lightHoverTextProps = '[&>span]:hover:text-primary';
export const darkHoverTextProps = 'dark:[&>span]:hover:text-primary-dark';
const hoverTextProps = `${lightHoverTextProps} ${darkHoverTextProps}`;

const defaultProps = `${themeProps} ${hoverProps} ${hoverTextProps}`;

export default function ArtistCard({
  data,
  onClick,
  loading = false
}: CardProps<Artist>) {
  if (loading) return <Skeleton />;

  return (
    <div
      data-testid="artist-card"
      className={`relative flex flex-col items-center rounded-md m-3 cursor-pointer shadow-md ${defaultProps}`}
      onClick={onClick}
    >
      <div className="h-44 w-44 p-2">
        <img
          alt={data.name}
          src={data.image}
          className="w-full h-full rounded-md"
          loading="lazy"
        />
      </div>

      <span className="text-md pb-2">{data.name}</span>
    </div>
  );
}

function Skeleton() {
  return (
    <div
      data-testid="artist-card-skeleton"
      className="flex flex-col items-center bg-neutral-200 dark:bg-neutral-900 rounded-md m-3 shadow-md animate-pulse"
    >
      <div className="bg-neutral-300 dark:bg-neutral-700 w-40 h-40 m-2 rounded-md" />
      <div className="bg-neutral-200 dark:bg-neutral-900 w-44 h-8 p-0.5 rounded-b-md flex justify-center">
        <div className="bg-neutral-300 dark:bg-neutral-700 w-24 h-5 rounded-md" />
      </div>
    </div>
  );
}
