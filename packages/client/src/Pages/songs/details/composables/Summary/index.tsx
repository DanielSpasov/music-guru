import { FC } from 'react';

import { SummaryProps } from './types';

// Composables
import Item from '../Item';

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
      <Item
        label="Producers"
        type="links"
        linkType="artists"
        value={[]}
        missingText="Coming Soon"
      />
      <Item
        label="Writers"
        type="links"
        linkType="artists"
        value={[]}
        missingText="Coming Soon"
      />
      <Item label="Albums" type="links" linkType="albums" value={albums} />
    </div>
  );
};

export default Summary;
