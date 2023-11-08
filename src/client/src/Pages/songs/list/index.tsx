import { useCallback, useContext, useState } from 'react';

import { List, Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { Config } from '../../../Api/helpers';
import Create from './modals/Create';
import Api from '../../../Api';

export default function Songs() {
  const { isAuthenticated } = useContext(AuthContext);

  const [openCreate, setOpenCreate] = useState(false);

  const fetchFn = useCallback(
    (config?: Config) => Api.songs.fetch({ config }),
    []
  );

  return (
    <PageLayout
      title="Songs"
      actions={[
        {
          icon: 'add',
          onClick: () => setOpenCreate(true),
          disabled: !isAuthenticated
        }
      ]}
    >
      <List fetchFn={fetchFn} model="songs" skeletonLength={54} />

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
