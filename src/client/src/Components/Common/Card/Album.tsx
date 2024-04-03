import moment from 'moment';
import { ListAlbum } from '../../../Pages/albums/helpers';
import { CardProps } from './helpers';

export const lightProps = 'bg-neutral-200';
export const darkProps = 'dark:bg-neutral-900';
const themeProps = `${lightProps} ${darkProps}`;

export const lightHoverProps = 'hover:shadow-neutral-400';
export const darkHoverProps = 'dark:hover:shadow-neutral-900';
const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

export const lightHoverTextProps =
  '[&>div:nth-child(2)>span:nth-child(1)]:hover:text-primary';
export const darkHoverTextProps =
  'dark:[&>div:nth-child(2)>span:nth-child(1)]:hover:text-primary-dark';
const hoverTextProps = `${lightHoverTextProps} ${darkHoverTextProps}`;

const defaultProps = `${themeProps} ${hoverProps} ${hoverTextProps}`;

export default function AlbumCard({
  data,
  onClick,
  loading = false
}: CardProps<ListAlbum>) {
  if (loading) return <Skeleton />;

  return (
    <div
      data-testid="album-card"
      className={`relative flex flex-col items-center rounded-md m-3 cursor-pointer shadow-md ${defaultProps}`}
      onClick={onClick}
    >
      <div className="w-44 h-44 p-2">
        <img
          alt={data.name}
          src={data.image}
          data-testid="album-card-image"
          loading="lazy"
          className="w-full h-full rounded-md"
        />
      </div>

      <div className="flex flex-col pb-2">
        <span
          className="text-md truncate w-44 px-2"
          data-testid="album-card-name"
        >
          {data.name}
        </span>
        <div className="text-md truncate w-44">
          <span
            className="text-neutral-500 pl-2"
            data-testid="album-card-release-date"
          >
            {data?.release_date ? moment(data?.release_date).year() : 'TBA'}
          </span>
          <span className="text-neutral-500 px-1">•</span>
          <span className="text-neutral-500 pr-1" data-testid="album-card-type">
            {data.type.name}
          </span>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
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
}
