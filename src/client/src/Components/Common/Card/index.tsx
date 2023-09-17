import { CardProps } from './helpers';

import ArtistCard from './Artist';
import AlbumCard from './Album';
import SongCard from './Song';

export default function Card({ data, model, onClick }: CardProps<any>) {
  switch (model) {
    case 'songs':
      return <SongCard data={data} onClick={onClick} />;
    case 'albums':
      return <AlbumCard data={data} onClick={onClick} />;
    case 'artists':
      return <ArtistCard data={data} onClick={onClick} />;
    default:
      return <></>;
  }
}
