import { useCallback, useContext, useState } from 'react';

import { List, Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { Config } from '../../../Api/helpers';
import CreateAlbum from '../create';
import Api from '../../../Api';

export default function Albums() {
  const { isAuthenticated } = useContext(AuthContext);

  const [openCreate, setOpenCreate] = useState(false);

  const fetchFn = useCallback(
    (config?: Config) => Api.albums.fetch({ config }),
    []
  );

  return (
    <PageLayout
      title="Albums"
      actions={[
        {
          icon: 'add',
          onClick: () => setOpenCreate(true),
          disabled: !isAuthenticated
        }
      ]}
    >
      <List fetchFn={fetchFn} model="albums" />

      <Modal
        key="create-album"
        title="Create Album"
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
      >
        <CreateAlbum />
      </Modal>
    </PageLayout>
  );
}
