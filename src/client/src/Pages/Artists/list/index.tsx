import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Card, PageLayout } from '../../../Components';
import useActions from '../useActions';
import { Artist } from '../helpers';
import Api from '../../../Api';
import { errorHandler } from '../../../Handlers';

export default function Artists() {
  const actions = useActions({ model: 'artists-list' });
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.artists.fetch({});
        setArtists(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const onArtistClick = useCallback(
    (uid: string) => navigate(`/artists/${uid}`),
    [navigate]
  );

  return (
    <PageLayout title="Artists" actions={actions} loading={loading}>
      <Box display="flex" margin="0 5%" flexWrap="wrap">
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
