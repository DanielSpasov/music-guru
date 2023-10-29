import moment from 'moment';
import { Album } from '../../../Pages/albums/helpers';
import { CardProps } from './helpers';

const hoverProps =
  '[&>img]:hover:-top-7 [&>div:nth-child(2)>span:nth-child(1)]:hover:text-primary hover:shadow-neutral-400';
const darkProps =
  'dark:bg-neutral-900 dark:[&>div:nth-child(2)>span:nth-child(1)]:hover:text-primary-dark dark:hover:shadow-neutral-900';

export default function AlbumCard({
  data,
  onClick,
  loading = false
}: CardProps<Album>) {
  if (loading) return <Skeleton />;

  return (
    <div
      className={`relative flex flex-col items-center bg-neutral-200 rounded-md m-3 cursor-pointer shadow-md ${hoverProps} ${darkProps}`}
      onClick={onClick}
    >
      <div className="w-44 h-44 p-2">
        <img
          alt={data.name}
          src={data.image}
          className="w-full h-full rounded-md"
        />
      </div>

      <div className="flex flex-col pb-2">
        <span className="text-md truncate w-44 px-2">{data.name}</span>
        <span className="text-md text-neutral-500 truncate w-44 px-2">
          {data?.release_date ? moment(data?.release_date).year() : 'TBA'} •{' '}
          {data?.type?.name}
        </span>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col items-center m-3 animate-pulse bg-neutral-200 dark:bg-neutral-900 rounded-md">
      <div className="bg-neutral-300 dark:bg-neutral-700 w-40 h-40 m-2 rounded-md" />
      <div className="bg-neutral-200 dark:bg-neutral-900 w-full h-14 pb-1 rounded-md">
        <div className="bg-neutral-300 dark:bg-neutral-700 rounded-md w-24 h-5 mx-2 mb-2" />
        <div className="bg-neutral-300 dark:bg-neutral-700 rounded-md w-16 h-5 mx-2 mb-2" />
      </div>
    </div>
  );
}
