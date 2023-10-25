import { Album } from '../../../Pages/albums/helpers';
import { CardProps } from './helpers';

const hoverProps = '[&>span]:hover:text-primary [&>div>img]:hover:-top-2';
const darkProps = 'dark:[&>span]:hover:text-primary-dark';

export default function AlbumCard({
  data,
  onClick,
  loading = false
}: CardProps<Album>) {
  if (loading) return <Skeleton />;
  return (
    <div
      className={`flex flex-col items-center m-4 cursor-pointer bg-neutral-900 shadow-md rounded-md ${hoverProps} ${darkProps}`}
      onClick={onClick}
    >
      <div className="relative h-48 w-48">
        <div className="absolute w-48 h-48 top-0 rounded-md bg-primary dark:bg-primary-dark" />
        <img
          alt={data.name}
          src={data.image}
          className="absolute w-48 h-48 top-0 rounded-md"
        />
      </div>

      <span className="text-lg p-2 text-center truncate w-48">{data.name}</span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col items-center m-4 animate-pulse">
      <div className="bg-neutral-900 w-48 h-48 rounded-md" />
      <div className="bg-neutral-900 w-16 h-6 m-1 rounded-md" />
    </div>
  );
}
