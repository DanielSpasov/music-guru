import { useCallback, useContext, useState } from 'react';

import { List, Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { Config } from '../../../Api/helpers';
import Create from './modals/Create';
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
          perform: () => setOpenCreate(true),
          disabled: !isAuthenticated
        }
      ]}
    >
      <List fetchFn={fetchFn} model="albums" />

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
