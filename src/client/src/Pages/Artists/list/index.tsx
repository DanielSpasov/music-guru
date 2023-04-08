import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, List, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import useActions from '../useActions';
import { Artist } from '../helpers';
import Api from '../../../Api';

export default function Artists() {
  const actions = useActions({ model: 'artists-list' });
  const [loading, setLoading] = useState<boolean>(true);
  const [artists, setArtists] = useState<Artist[]>([]);

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

  return (
    <PageLayout title="Artists" actions={actions}>
      <Box display="flex" margin="0 5%" flexWrap="wrap">
        <List data={artists} model="artists" loading={loading} />
      </Box>
    </PageLayout>
  );
}
