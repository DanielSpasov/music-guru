import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

export default function Albums() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Albums"
      actions={[
        {
          icon: 'add',
          onClick: () => navigate('create'),
          disabled: !isAuthenticated
        }
      ]}
    >
      <List fetchFn={config => Api.albums.fetch({ config })} model="albums" />
    </PageLayout>
  );
}
