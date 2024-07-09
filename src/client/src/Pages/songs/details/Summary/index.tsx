import { SummaryProps } from './types';
import Item from './Item';
import { FC } from 'react';

const Summary: FC<SummaryProps> = ({ song, albums }) => {
  return (
    <div className="pl-4">
      <Item label="Artist" type="link" linkType="artists" value={song.artist} />
      <Item label="Release Date" type="date" value={song.release_date} />
      <Item
        label="Features"
        type="links"
        linkType="artists"
        value={song.features}
      />
      <Item label="Producers" type="links" linkType="artists" value={[]} />
      <Item label="Writers" type="links" linkType="artists" value={[]} />
      <Item label="Albums" type="links" linkType="albums" value={albums} />
    </div>
  );
};

export default Summary;
