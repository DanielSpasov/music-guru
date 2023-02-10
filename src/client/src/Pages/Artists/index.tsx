import { useCallback, useEffect, useState } from 'react';

import { Box, Card, Loader, PageLayout } from '../../Components';
import useActions from './useActions';
import { Artist } from './helpers';
import Api from '../../Api';
import { useNavigate } from 'react-router-dom';

export default function Artists() {
  const actions = useActions();
  const [artists, setArtists] = useState<Artist[]>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await Api.artists.fetch({});
      setArtists(data);
    })();
  }, []);

  const onArtistClick = useCallback((uid: string) => {
    navigate(`/artists/${uid}`);
  }, []);

  return (
    <PageLayout title={artists ? 'Artists' : 'Loading...'} actions={actions}>
      {!artists && (
        <Box textAlign="center">
          <Loader rainbow />
        </Box>
      )}
      <Box display="flex" margin="0 5%">
        {artists &&
          artists.map(artist => (
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
