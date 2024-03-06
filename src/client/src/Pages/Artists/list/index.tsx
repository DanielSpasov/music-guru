import { useState, useContext, useCallback } from 'react';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { Config } from '../../../Api/helpers';
import Create from './modals/Create';
import Api from '../../../Api';

export default function Artists() {
  const { isAuthenticated } = useContext(AuthContext);

  const [openCreate, setOpenCreate] = useState(false);

  const fetchFn = useCallback(
    (config?: Config) => Api.artists.fetch({ config }),
    []
  );

  return (
    <PageLayout
      title="Artists"
      actions={[
        {
          icon: 'add',
          onClick: () => setOpenCreate(true),
          disabled: !isAuthenticated
        }
      ]}
    >
      <List fetchFn={fetchFn} model="artists" />

      <section>
        {openCreate && <Create onClose={() => setOpenCreate(false)} />}
      </section>
    </PageLayout>
  );
}
