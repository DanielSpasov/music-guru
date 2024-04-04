import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

export default function Songs() {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <PageLayout
      title="Songs"
      showHeader={false}
      actions={[
        {
          icon: 'add',
          onClick: () => navigate('create'),
          hidden: !isAuthenticated
        }
      ]}
    >
      <List
        center={false}
        fetchFn={config => Api.songs.fetch({ config })}
        model="songs"
        skeletonLength={54}
      />
    </PageLayout>
  );
}
