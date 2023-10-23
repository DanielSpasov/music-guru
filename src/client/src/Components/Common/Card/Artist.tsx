import { Artist } from '../../../Pages/artists/helpers';
import { CardProps } from './helpers';

export default function ArtistCard({ data, onClick }: CardProps<Artist>) {
  return (
    <div
      className="flex flex-col items-center w-48 m-4 relative cursor-pointer [&>span]:hover:text-primary dark:[&>span]:hover:text-primary-dark"
      onClick={onClick}
    >
      <img src={data?.image || ''} className="h-48 w-48 rounded-full" />
      <span className="p-2 text-lg">{data?.name}</span>
    </div>
  );
}
