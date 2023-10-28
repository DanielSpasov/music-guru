import { Artist } from '../../../Pages/artists/helpers';
import { CardProps } from './helpers';

const hoverProps = 'hover:shadow-neutral-400 [&>span]:hover:text-primary';
const darkProps =
  'dark:[&>span]:hover:text-primary-dark dark:bg-neutral-900 dark:hover:shadow-neutral-900';

export default function ArtistCard({
  data,
  onClick,
  loading = false
}: CardProps<Artist>) {
  if (loading) return <Skeleton />;
  return (
    <div
      className={`relative flex flex-col items-center bg-neutral-200 rounded-md m-3 cursor-pointer shadow-md ${hoverProps} ${darkProps}`}
      onClick={onClick}
    >
      <div className="h-44 w-44 p-2">
        <img src={data?.image || ''} className="w-full h-full rounded-md" />
      </div>

      <span className="text-md pb-2">{data?.name}</span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col items-center bg-neutral-200 dark:bg-neutral-900 rounded-md m-3 shadow-md animate-pulse">
      <div className="bg-neutral-300 dark:bg-neutral-700 w-40 h-40 m-2 rounded-md" />
      <div className="bg-neutral-200 dark:bg-neutral-900 w-44 h-8 p-0.5 rounded-b-md flex justify-center">
        <div className="bg-neutral-300 dark:bg-neutral-700 w-24 h-5 rounded-md" />
      </div>
    </div>
  );
}
