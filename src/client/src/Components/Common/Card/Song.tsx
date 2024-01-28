import { Song } from '../../../Pages/songs/helpers';
import { CardProps } from './helpers';

const hoverProps =
  'hover:shadow-neutral-400 [&>div>span:nth-child(1)]:hover:text-primary';
const darkProps =
  'dark:bg-neutral-900 dark:hover:shadow-neutral-900 dark:[&>div>span:nth-child(1)]:hover:text-primary-dark';

export default function SongCard({
  data,
  onClick,
  loading = false
}: CardProps<Song>) {
  if (loading) return <Skeleton />;
  return (
    <div
      className={`flex items-center w-48 h-16 p-2 m-1 rounded-md cursor-pointer bg-neutral-200 shadow-md ${hoverProps} ${darkProps}`}
      onClick={onClick}
    >
      <img
        onClick={onClick}
        src={data?.image || '/images/logo/blue-logo-square512.png'}
        className="w-12 h-12 rounded-sm"
        loading="lazy"
      />

      <div className="relative flex flex-col p-2">
        <span className="line-clamp-1">{data.name}</span>
        <span className="text-neutral-500 truncate">{data.artist}</span>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="w-48 h-16 m-1 flex items-center bg-neutral-200 dark:bg-neutral-900 rounded-md animate-pulse">
      <div className="w-12 h-12 bg-neutral-300 dark:bg-neutral-700 rounded-md m-2" />
      <div>
        <div className="w-24 h-5 bg-neutral-300 dark:bg-neutral-700 my-2 rounded-md" />
        <div className="w-16 h-5 bg-neutral-300 dark:bg-neutral-700 my-2 rounded-md" />
      </div>
    </div>
  );
}
