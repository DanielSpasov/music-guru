import { useCallback, useContext, useEffect, useState } from 'react';

import { Box, List, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { Song } from '../helpers';
import Api from '../../../Api';
import { AuthContext } from '../../../Contexts/Auth';
import Modals from './modals';

export default function Songs() {
  const { isAuthenticated } = useContext(AuthContext);

  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [songs, setSongs] = useState<Song[]>([]);

  const fetchSongs = useCallback(async () => {
    try {
      const { data } = await Api.songs.fetch({
        config: { params: { serializer: 'list' } }
      });
      setSongs(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => await fetchSongs())();
  }, [fetchSongs]);

  return (
    <PageLayout
      title="Songs"
      actions={[
        {
          icon: 'add',
          perform: () => setOpenCreate(true),
          disabled: !isAuthenticated
        }
      ]}
    >
      <Box display="flex" margin="0 5%" flexWrap="wrap">
        <List data={songs} model="songs" loading={loading} />
      </Box>

      <Modals openCreate={openCreate} setOpenCreate={setOpenCreate} />
    </PageLayout>
  );
}
