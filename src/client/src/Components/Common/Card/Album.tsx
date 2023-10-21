import { Album } from '../../../Pages/albums/helpers';
import { CardProps } from './helpers';

export default function AlbumCard({ data, onClick }: CardProps<Album>) {
  return (
    <div
      className="flex flex-col-reverse items-center m-4 cursor-pointer hover:text-primary [&>span]:hover:text-primary"
      onClick={onClick}
    >
      <span className="text-lg p-2 text-center truncate w-48 [&+div>img]:hover:-top-2">
        {data.name}
      </span>

      <div className="relative h-48 w-48">
        <div className="absolute w-48 h-48 top-0 rounded-md bg-primary" />
        <img
          alt={data.name}
          src={data.image}
          className="absolute w-48 h-48 top-0 rounded-md hover:-top-2"
        />
      </div>
    </div>
  );
}
