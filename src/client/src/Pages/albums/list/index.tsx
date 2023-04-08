import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, List, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import useActions from '../useActions';
import { Album } from '../helpers';
import Api from '../../../Api';

export default function Albums() {
  const actions = useActions({ model: 'albums-list' });
  const [loading, setLoading] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Album[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.albums.fetch({});
        setAlbums(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <PageLayout title="Albums" actions={actions}>
      <Box display="flex" margin="0 5%" flexWrap="wrap">
        <List data={albums} model="albums" loading={loading} />
      </Box>
    </PageLayout>
  );
}
