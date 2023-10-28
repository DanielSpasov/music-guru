import { useCallback, useContext, useEffect, useState } from 'react';

import { List, Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import Create from './modals/Create';
import { Song } from '../helpers';
import Api from '../../../Api';

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
      <List data={songs} model="songs" loading={loading} skeletonLength={54} />

      <section>
        {openCreate && (
          <Modal onClose={() => setOpenCreate(false)}>
            <Create onClose={() => setOpenCreate(false)} />
          </Modal>
        )}
      </section>
    </PageLayout>
  );
}
