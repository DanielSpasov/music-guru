import { Song } from '../../../Pages/songs/helpers';
import { CardProps } from './helpers';

export default function SongCard({ data, onClick }: CardProps<Song>) {
  return (
    <div
      className="flex items-center w-48 h-16 p-2 m-2 rounded-md hover:bg-neutral-700 cursor-pointer"
      onClick={onClick}
    >
      <img
        onClick={onClick}
        src={data?.image || '/images/logo/blue-logo-square512.png'}
        className="w-12 h-12 rounded-sm"
      />

      <div className="h-full px-2">
        <span className="whitespace-normal">{data.name}</span>
      </div>
    </div>
  );
}
