import { CardProps } from './helpers';

import ArtistCard from './Artist';
import AlbumCard from './Album';
import SongCard from './Song';

export default function Card({ model, ...cardProps }: CardProps<any>) {
  switch (model) {
    case 'songs':
      return <SongCard {...cardProps} />;
    case 'albums':
      return <AlbumCard {...cardProps} />;
    case 'artists':
      return <ArtistCard {...cardProps} />;
    default:
      return <></>;
  }
}
