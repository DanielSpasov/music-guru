import { Album } from '../../../Pages/albums/helpers';
import { CardProps } from './helpers';

const hoverProps = '[&>span]:hover:text-primary [&>div>img]:hover:-top-2';
const darkProps = 'dark:[&>span]:hover:text-primary-dark';

export default function AlbumCard({ data, onClick }: CardProps<Album>) {
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
