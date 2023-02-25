import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, List, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import useActions from '../useActions';
import { Song } from '../helpers';
import Api from '../../../Api';

export default function Songs() {
  const actions = useActions({ model: 'song-list' });
  const [loading, setLoading] = useState<boolean>(true);
  const [songs, setSongs] = useState<Song[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.songs.fetch({});
        setSongs(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <PageLayout title="Songs" actions={actions} loading={loading}>
      <Box display="flex" margin="0 5%" flexWrap="wrap">
        <List data={songs} model="songs" />
      </Box>
    </PageLayout>
  );
}
