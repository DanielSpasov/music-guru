import { useEffect, useState, useContext, useCallback } from 'react';

import { List, Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import Create from './modals/Create';
import { Artist } from '../helpers';
import Api from '../../../Api';

export default function Artists() {
  const [loading, setLoading] = useState<boolean>(true);
  const [artists, setArtists] = useState<Artist[]>([]);

  const [openCreate, setOpenCreate] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);

  const fetchArtists = useCallback(async () => {
    try {
      const { data } = await Api.artists.fetch({
        config: { params: { serializer: 'list' } }
      });
      setArtists(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => await fetchArtists())();
  }, [fetchArtists]);

  return (
    <PageLayout
      title="Artists"
      actions={[
        {
          icon: 'add',
          perform: () => setOpenCreate(true),
          disabled: !isAuthenticated
        }
      ]}
    >
      <List data={artists} model="artists" loading={loading} />

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
