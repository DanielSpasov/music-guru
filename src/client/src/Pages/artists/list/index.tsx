import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

export default function Artists() {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <PageLayout
      title="Artists"
      showHeader={false}
      actions={[
        {
          icon: 'add',
          onClick: () => navigate('create'),
          disabled: !isAuthenticated
        }
      ]}
    >
      <List fetchFn={config => Api.artists.fetch({ config })} model="artists" />
    </PageLayout>
  );
}
