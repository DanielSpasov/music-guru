import { Album } from '../../../Pages/albums/helpers';
import { CardProps } from './helpers';

export default function AlbumCard({ data, onClick }: CardProps<Album>) {
  return (
    <div className="flex flex-col items-center text-white m-4 duration-200 hover:text-primary cursor-pointer">
      <div className="relative h-48 w-48">
        <div className="absolute w-48 h-48 top-0 rounded-md bg-primary" />
        <img
          alt={data.name}
          src={data.image}
          onClick={onClick}
          className="absolute w-48 h-48 top-0 rounded-md duration-200 hover:-top-2"
        />
      </div>

      <span className="text-lg p-2 text-center truncate w-48" onClick={onClick}>
        {data.name}
      </span>
    </div>
  );
}
