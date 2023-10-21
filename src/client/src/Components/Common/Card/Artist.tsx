import { Artist } from '../../../Pages/artists/helpers';
import { CardProps } from './helpers';

export default function ArtistCard({ data, onClick }: CardProps<Artist>) {
  return (
    <div
      className="flex flex-col items-center w-48 m-4 relative duration-200 text-white hover:text-primary cursor-pointer"
      onClick={onClick}
    >
      <img
        src={data?.image || ''}
        onClick={onClick}
        className="h-48 w-48 rounded-full"
      />
      <span className="p-2 text-lg">{data?.name}</span>
    </div>
  );
}
