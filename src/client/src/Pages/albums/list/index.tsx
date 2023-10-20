import { useCallback, useContext, useEffect, useState } from 'react';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Album } from '../helpers';
import Api from '../../../Api';
import Modals from './modals';

export default function Albums() {
  const { isAuthenticated } = useContext(AuthContext);

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Album[]>([]);

  const fetchAlbums = useCallback(async () => {
    try {
      const { data } = await Api.albums.fetch({
        config: { params: { serializer: 'list' } }
      });
      setAlbums(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => await fetchAlbums())();
  }, [fetchAlbums]);

  return (
    <PageLayout
      title="Albums"
      actions={[
        {
          icon: 'add',
          perform: () => setOpenCreate(true),
          disabled: !isAuthenticated
        }
      ]}
    >
      <List data={albums} model="albums" loading={loading} />

      <Modals openCreate={openCreate} setOpenCreate={setOpenCreate} />
    </PageLayout>
  );
}
