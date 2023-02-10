import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Card, PageLayout } from '../../Components';
import useActions from './useActions';
import { Artist } from './helpers';
import Api from '../../Api';

export default function Artists() {
  const actions = useActions();
  const [artists, setArtists] = useState<Artist[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await Api.artists.fetch({});
      setArtists(data);
    })();
  }, []);

  const onArtistClick = useCallback(
    (uid: string) => navigate(`/artists/${uid}`),
    [navigate]
  );

  return (
    <PageLayout title="Artists" actions={actions} loading={!artists.length}>
      <Box display="flex" margin="0 5%">
        {artists.map(artist => (
          <Card
            key={artist.uid}
            title={artist.name}
            image={artist.image}
            onClick={() => onArtistClick(artist.uid)}
          />
        ))}
      </Box>
    </PageLayout>
  );
}
