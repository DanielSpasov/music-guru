import { Song } from '../../../Pages/songs/helpers';
import { CardProps } from './helpers';

export default function SongCard({
  data,
  onClick,
  loading = false
}: CardProps<Song>) {
  if (loading) return <Skeleton />;
  return (
    <div
      className="flex items-center w-52 h-20 p-2 m-2 rounded-md hover:bg-neutral-700 cursor-pointer"
      onClick={onClick}
    >
      <img
        onClick={onClick}
        src={data?.image || '/images/logo/blue-logo-square512.png'}
        className="w-16 h-16 rounded-sm"
      />

      <div className="h-20 px-2 py-1 whitespace-normal overflow-hidden">
        <span>{data.name}</span>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="w-52 h-20 m-2 bg-neutral-900 rounded-md animate-pulse" />
  );
}
