import { Artist } from '../../../Pages/artists/helpers';
import { CardProps } from './helpers';

const hoverProps = 'hover:shadow-neutral-400 [&>span]:hover:text-primary';
const darkProps =
  'dark:[&>span]:hover:text-primary-dark dark:bg-neutral-900 dark:hover:shadow-neutral-900';

export default function ArtistCard({ data, onClick }: CardProps<Artist>) {
  return (
    <div
      className={`relative flex flex-col items-center bg-neutral-100 rounded-md m-3 r w-44 cursor-pointer shadow-md ${hoverProps} ${darkProps}`}
      onClick={onClick}
    >
      <img src={data?.image || ''} className="h-44 w-44 rounded-md" />
      <span className="text-lg p-2">{data?.name}</span>
    </div>
  );
}
